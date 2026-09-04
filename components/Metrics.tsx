'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const QuarksBurst = dynamic(() => import('@/components/MetricsQuarks'), {
  ssr: false,
  loading: () => null,
})

const items = [
  { value: '47+', label: 'орбит запущено' },
  { value: '1200+', label: 'часов внимания возвращено' },
  { value: '0', label: 'критических коллапсов' },
  { value: '78%', label: 'возвращаются за следующей орбитой' },
]

export default function Metrics() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    if (reduced || mobile) return

    let webgl = false
    try {
      const probe = document.createElement('canvas')
      webgl = Boolean(probe.getContext('webgl2') || probe.getContext('webgl'))
    } catch {
      webgl = false
    }
    if (!webgl) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setBurst(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="metrics" ref={sectionRef} className="relative py-32">
      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div className="grid-12" aria-hidden="true" />

        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              05 · метрики
            </span>
          </div>
          <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Телеметрия, а не реклама
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {items.map((item) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="border-t border-white/[0.1] pt-7"
            >
              <div className="font-mono text-4xl text-chi sm:text-5xl">{item.value}</div>
              <div className="mt-4 text-sm leading-relaxed text-ink-dim">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs text-ink-dim">
          // без округления в сторону маркетинга
        </p>

        {burst && (
          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
            <QuarksBurst />
          </div>
        )}
      </div>
    </section>
  )
}