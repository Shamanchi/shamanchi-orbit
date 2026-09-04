'use client'

import { useEffect, useRef, useState } from 'react'

const CX = 400
const CY = 235
const OUTER = { rx: 320, ry: 150 }
const INNER = { rx: 205, ry: 96 }
const INK = '#E6EDF3'
const INK_DIM = '#8B98A9'
const CHI = '#00D4FF'
const SEGMENT_MS = 1100

type StepType = 'system' | 'action'

type Step = {
  name: string
  sub: string
  type: StepType
  person?: boolean
}

// Closed data loop: 1 -> 2 -> ... -> 8 -> back to 1.
// Systems sit on the outer orbit, actions on the inner one.
const STEPS: Step[] = [
  { name: '1С', sub: 'заявка · остатки', type: 'system' },
  { name: 'CRM', sub: 'карточка клиента', type: 'system' },
  { name: 'Telegram', sub: 'уведомление менеджеру', type: 'action' },
  { name: 'AI-ассистент', sub: 'типовые вопросы', type: 'action' },
  { name: 'Менеджер', sub: 'только сложные · контекст', type: 'action', person: true },
  { name: 'Ответ клиенту', sub: '', type: 'action' },
  { name: 'Google Sheets', sub: 'отчёт', type: 'system' },
  { name: 'Аналитика', sub: 'точка рычага', type: 'system' },
]

function nodePosition(index: number) {
  const angle = (index * Math.PI) / 4
  const ring = STEPS[index].type === 'system' ? OUTER : INNER
  return {
    x: CX + ring.rx * Math.cos(angle),
    y: CY + ring.ry * Math.sin(angle),
  }
}


function NodeMark({ index }: { index: number }) {
  const step = STEPS[index]
  const { x, y } = nodePosition(index)

  if (step.person) {
    return (
      <g>
        <circle cx={x} cy={y} r={30} fill={`url(#halo-${index})`} />
        <circle cx={x} cy={y} r={6} fill={CHI} />
        <circle cx={x} cy={y} r={6} fill="none" stroke="rgba(0,212,255,0.55)" strokeWidth={6} opacity={0.35} />
      </g>
    )
  }

  if (step.type === 'system') {
    return (
      <rect
        x={x - 5}
        y={y - 5}
        width={10}
        height={10}
        fill="#0B1120"
        stroke="rgba(0,212,255,0.5)"
        strokeWidth={1.2}
      />
    )
  }

  return <circle cx={x} cy={y} r={4.5} fill="#0B1120" stroke="rgba(139,152,169,0.65)" strokeWidth={1.2} />
}

function NodeLabel({ index }: { index: number }) {
  const step = STEPS[index]
  const pos = nodePosition(index)
  const number = String(index + 1).padStart(2, '0')

  return (
    <g>
      <text
        x={pos.x}
        y={pos.y - 14}
        textAnchor="end"
        fontSize={9}
        className="font-mono"
        fill={INK_DIM}
        opacity={0.75}
      >
        {number}
      </text>
      <text
        x={pos.x}
        y={pos.y + 24}
        textAnchor="middle"
        fontSize={13}
        className="font-mono"
        fill={step.person ? CHI : INK}
        stroke="#0B1120"
        strokeWidth={4}
        paintOrder="stroke"
      >
        {step.name}
      </text>
      {step.sub ? (
        <text
          x={pos.x}
          y={pos.y + 39}
          textAnchor="middle"
          fontSize={10}
          className="font-mono"
          fill={INK_DIM}
          stroke="#0B1120"
          strokeWidth={3}
          paintOrder="stroke"
        >
          {step.sub}
        </text>
      ) : null}
      {step.person ? (
        <text
          x={pos.x}
          y={pos.y + 54}
          textAnchor="middle"
          fontSize={9}
          className="font-mono"
          fill={CHI}
          opacity={0.8}
          stroke="#0B1120"
          strokeWidth={3}
          paintOrder="stroke"
        >
          [ человек в цепи ]
        </text>
      ) : null}
    </g>
  )
}

function MobileScheme() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-1.5 px-1">
      {[0, 2, 4, 6].map((rowStart) => (
        <div key={rowStart} className="grid grid-cols-2 gap-1.5">
          {STEPS.slice(rowStart, rowStart + 2).map((step, offset) => {
            const index = rowStart + offset
            const number = String(index + 1).padStart(2, '0')
            return (
              <div
                key={step.name}
                className={
                  'flex items-baseline gap-1.5 border px-2 py-1 ' +
                  (step.person
                    ? 'border-[rgba(0,212,255,0.5)] bg-[rgba(0,212,255,0.06)]'
                    : 'border-white/[0.1]')
                }
              >
                <span className="font-mono text-[9px] leading-none text-chi">{number}</span>
                <span
                  className={
                    'truncate font-mono text-[10px] leading-tight ' +
                    (step.person ? 'text-chi' : 'text-ink')
                  }
                >
                  {step.name}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function OrbitMapFlow({ reduced }: { reduced: boolean }) {
  const [mobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const pulseRef = useRef<SVGCircleElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const tailRef = useRef<SVGLineElement>(null)
  const animated = !reduced && !mobile

  useEffect(() => {
    if (!animated) return
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const total = STEPS.length * SEGMENT_MS
      const p = ((elapsed % total) / total) * STEPS.length
      const seg = Math.floor(p) % STEPS.length
      const u = p - Math.floor(p)
      const from = nodePosition(seg)
      const to = nodePosition((seg + 1) % STEPS.length)
      const x = from.x + (to.x - from.x) * u
      const y = from.y + (to.y - from.y) * u

      if (pulseRef.current) {
        pulseRef.current.setAttribute('cx', String(x))
        pulseRef.current.setAttribute('cy', String(y))
      }
      if (glowRef.current) {
        glowRef.current.setAttribute('cx', String(x))
        glowRef.current.setAttribute('cy', String(y))
      }
      if (tailRef.current) {
        tailRef.current.setAttribute('x1', String(from.x))
        tailRef.current.setAttribute('y1', String(from.y))
        tailRef.current.setAttribute('x2', String(x))
        tailRef.current.setAttribute('y2', String(y))
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animated])

  if (mobile) return <MobileScheme />

  return (
    <svg viewBox="0 0 800 470" className="h-full w-full" role="img" aria-label="Замкнутый поток данных: 1С, CRM, Telegram, AI-ассистент, Менеджер, ответ клиенту, Google Sheets, аналитика — и снова в 1С">
      <defs>
        {STEPS.map((step, index) =>
          step.person ? (
            <radialGradient key={index} id={`halo-${index}`}>
              <stop offset="0%" stopColor={CHI} stopOpacity={0.22} />
              <stop offset="100%" stopColor={CHI} stopOpacity={0} />
            </radialGradient>
          ) : null
        )}
        <radialGradient id="pulse-glow">
          <stop offset="0%" stopColor={CHI} stopOpacity={0.55} />
          <stop offset="100%" stopColor={CHI} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Orbit guides */}
      <ellipse cx={CX} cy={CY} rx={OUTER.rx} ry={OUTER.ry} fill="none" stroke="rgba(139,152,169,0.16)" strokeWidth={1} />
      <ellipse cx={CX} cy={CY} rx={INNER.rx} ry={INNER.ry} fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth={1} />

      {/* Nodes and labels */}
      {STEPS.map((step, index) => (
        <g key={step.name}>
          <NodeMark index={index} />
          <NodeLabel index={index} />
        </g>
      ))}

      {/* Data pulse */}
      {animated && (
        <g>
          <line ref={tailRef} stroke="rgba(0,212,255,0.16)" strokeWidth={1.5} />
          <circle ref={glowRef} r={16} fill="url(#pulse-glow)" />
          <circle ref={pulseRef} r={3.2} fill="#E6FDFF" stroke={CHI} strokeWidth={1} />
        </g>
      )}
    </svg>
  )
}