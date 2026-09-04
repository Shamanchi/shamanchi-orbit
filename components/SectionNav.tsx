'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'physics', num: '01', label: 'Физика Orbit' },
  { id: 'orbit-map', num: '02', label: 'Диаграмма орбит' },
  { id: 'process', num: '03', label: 'Процесс' },
  { id: 'works', num: '04', label: 'Работы' },
  { id: 'metrics', num: '05', label: 'Метрики' },
  { id: 'principles', num: '06', label: 'Принципы' },
  { id: 'pricing', num: '07', label: 'Тарифы' },
  { id: 'audit', num: '08', label: 'Аудит' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

export default function SectionNav() {
  const [active, setActive] = useState<SectionId>('physics')

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const probe = window.innerHeight * 0.4
      let current: SectionId = SECTIONS[0].id
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= probe) {
          current = section.id
        }
      }
      setActive((previous) => (previous === current ? previous : current))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav
      aria-label="Секции"
      className="fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-[18px] xl:flex"
      style={{ right: 'max(24px, calc(50vw - 520px))' }}
    >
      {SECTIONS.map((section) => {
        const isActive = active === section.id
        return (
          <a
            key={section.id}
            href={'#' + section.id}
            aria-label={section.num + ' — ' + section.label}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className={'h-px transition-all duration-300 ' + (isActive ? 'w-8 bg-[#00D4FF]' : 'w-4 bg-white/15 group-hover:w-6 group-hover:bg-white/30')}
            />
            <span
              className={'font-mono text-[10px] leading-none tracking-[0.25em] transition-colors duration-300 ' + (isActive ? 'text-[#00D4FF]' : 'text-ink-dim/60 group-hover:text-ink-dim')}
            >
              {section.num}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
