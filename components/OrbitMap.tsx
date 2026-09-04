'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type NodeSpec = { id: string; label: string; x: number; y: number }

const NODES: NodeSpec[] = [
  { id: '1c', label: '1С', x: 400, y: 84 },
  { id: 'crm', label: 'CRM', x: 656, y: 216 },
  { id: 'tg', label: 'Telegram', x: 596, y: 368 },
  { id: 'xl', label: 'Excel', x: 232, y: 372 },
  { id: 'hand', label: 'Ручной ввод', x: 144, y: 196 },
]

const BROKEN: Array<[string, string]> = [
  ['1c', 'crm'],
  ['crm', 'tg'],
  ['tg', 'xl'],
  ['xl', '1c'],
  ['hand', '1c'],
  ['hand', 'crm'],
]

function nodeById(id: string): NodeSpec {
  const found = NODES.find((n) => n.id === id)
  if (!found) {
    throw new Error(`unknown node ${id}`)
  }
  return found
}

function BrokenLink({ a, b }: { a: string; b: string }) {
  const na = nodeById(a)
  const nb = nodeById(b)
  const mx = (na.x + nb.x) / 2
  const my = (na.y + nb.y) / 2
  return (
    <g>
      <line
        x1={na.x}
        y1={na.y}
        x2={nb.x}
        y2={nb.y}
        stroke="#8B98A9"
        strokeOpacity={0.25}
        strokeWidth={1}
        strokeDasharray="3 8"
      />
      <text
        x={mx}
        y={my + 4}
        textAnchor="middle"
        className="font-mono"
        fontSize={12}
        fill="#8B98A9"
        fillOpacity={0.65}
      >
        ×
      </text>
    </g>
  )
}

function NodeView({ node }: { node: NodeSpec }) {
  return (
    <g>
      <circle
        cx={node.x}
        cy={node.y}
        r={5.5}
        fill="#0B1120"
        stroke="#8B98A9"
        strokeOpacity={0.85}
        strokeWidth={1}
      />
      <text
        x={node.x}
        y={node.y + 26}
        textAnchor="middle"
        className="font-mono"
        fontSize={13}
        fill="#8B98A9"
      >
        {node.label}
      </text>
    </g>
  )
}

const toggleClass = (active: boolean) =>
  `rounded border px-5 py-2.5 font-mono text-xs transition-colors ${
    active
      ? 'border-white/[0.3] text-ink'
      : 'border-white/[0.1] text-ink-dim hover:border-white/[0.2] hover:text-ink'
  }`

export default function OrbitMap() {
  const [flow, setFlow] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) {
      const t = window.setTimeout(() => setAnimate(true), 400)
      return () => window.clearTimeout(t)
    }
  }, [])

  return (
    <section id="orbit-map" className="relative py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="mark" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
                02 · диаграмма орбит
              </span>
            </div>
            <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Одна и та же компания. До и после
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-dim">
              Пять систем, которые держат данные при себе. Затем — одна орбита,
              по которой поток движется без рук.
            </p>
          </div>
          <div className="flex items-center gap-2" role="group" aria-label="Переключение диаграммы">
            <button type="button" onClick={() => setFlow(false)} aria-pressed={!flow} className={toggleClass(!flow)}>
              Разорванные узлы
            </button>
            <button type="button" onClick={() => setFlow(true)} aria-pressed={flow} className={toggleClass(flow)}>
              Восстановленный поток
            </button>
          </div>
        </div>

        <div className="relative border border-white/[0.06] p-3 sm:p-8">
          <svg
            viewBox="0 0 800 470"
            className="h-auto w-full"
            role="img"
            aria-label={
              flow
                ? 'Схема после: системы связаны в одну орбиту'
                : 'Схема до: системы не связаны между собой'
            }
          >
            <motion.g
              animate={{ opacity: flow ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              pointerEvents="none"
            >
              {BROKEN.map(([a, b]) => (
                <BrokenLink key={`${a}-${b}`} a={a} b={b} />
              ))}
            </motion.g>

            <motion.g
              animate={{ opacity: flow ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              pointerEvents="none"
            >
              <ellipse
                cx={400}
                cy={227}
                rx={262}
                ry={143}
                fill="none"
                stroke="#00D4FF"
                strokeOpacity={0.55}
                strokeWidth={1.2}
              />
              {animate && (
                <circle r={4.5} fill="#00D4FF">
                  <animateMotion
                    dur="9s"
                    repeatCount="indefinite"
                    path="M 400 84 A 262 143 0 1 1 399.9 84"
                  />
                </circle>
              )}
            </motion.g>

            <g>
              {NODES.map((node) => (
                <NodeView key={node.id} node={node} />
              ))}
            </g>
          </svg>
        </div>

        <p className="mt-5 font-mono text-xs text-ink-dim">
          {flow ? (
            <>
              поток: <span className="text-ink">1С → CRM → Telegram → Excel → 1С</span> — движение без рук
            </>
          ) : (
            <>
              связи: <span className="text-ink-dim">1С · CRM · Telegram · Excel</span> — каждая система держит данные при себе
            </>
          )}
        </p>
      </div>
    </section>
  )
}