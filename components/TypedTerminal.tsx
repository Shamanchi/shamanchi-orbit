'use client'

import { useEffect, useRef, useState } from 'react'

const lines = [
  'ручной труд — не «неэффективность». это симптом разрыва между системами, который вы не видите',
  'автоматизация без археологии — закодированный хаос. сначала раскапываем, потом строим',
  'каждый бизнес — гравитационная система. ищем точки, где масса процессов создаёт притяжение',
  'технология перестаёт быть магией, когда видна орбита',
  'мы не продаём часы. мы продаём прозрение — способность видеть скрытое',
]

export default function TypedTerminal() {
  const [count, setCount] = useState(0)
  const [partial, setPartial] = useState(0)
  const finished = count >= lines.length

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setCount(lines.length)
      setPartial(0)
      return
    }

    let line = 0
    let ch = 0
    const timer = window.setInterval(() => {
      if (line >= lines.length) {
        window.clearInterval(timer)
        return
      }
      ch += 1
      if (ch > lines[line].length) {
        line += 1
        ch = 0
        setCount(line)
      } else {
        setPartial(ch)
      }
    }, 13)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="terminal mx-auto w-full max-w-3xl text-left">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
        <span className="terminal-dot h-2.5 w-2.5 rounded-full bg-ink-dim/25" />
        <span className="terminal-dot h-2.5 w-2.5 rounded-full bg-ink-dim/25" />
        <span className="terminal-dot h-2.5 w-2.5 rounded-full bg-ink-dim/25" />
        <span className="ml-4 font-mono text-xs text-ink-dim">orbit@manifest — scan бизнес-процессов</span>
      </div>
      <div className="px-5 py-5 font-mono text-[13px] leading-7 text-ink sm:px-6 sm:text-sm">
        {lines.slice(0, count).map((line, i) => (
          <div key={i} className="flex gap-2.5">
            <span className="shrink-0 select-none text-chi">&gt;</span>
            <span>{line}</span>
          </div>
        ))}
        {!finished && (
          <div className="flex gap-2.5">
            <span className="shrink-0 select-none text-chi">&gt;</span>
            <span>
              {lines[count].slice(0, partial)}
              <span className="caret" />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}