'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const QuarksBurst = dynamic(() => import('@/components/MetricsQuarks'), {
  ssr: false,
  loading: () => null,
})

const items = [
  { value: '47+', label: 'орбит запущено', basis: 'накопительно' },
  { value: '1200+', label: 'часов внимания возвращено', basis: 'за 2 года' },
  { value: '0', label: 'критических коллапсов', basis: 'благодаря резервным орбитам' },
  { value: '78%', label: 'возвращаются за следующей орбитой', basis: 'из прошедших аудит' },
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
    <section id="metrics" ref={sectionRef} className="relative overflow-hidden py-40 lg:py-52">
      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,10,20,0.6)_100%)]"
          aria-hidden="true"
        />
        <div className="grid-12" aria-hidden="true" />

        <div className="relative mb-24 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              05 · метрики
            </span>
          </div>
          <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Телеметрия, а не реклама
          </h2>
        </div>

        <div className="relative border-t border-white/[0.06] pt-16 lg:pt-20">
          <div className="grid grid-cols-1 gap-y-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-0">
            {items.map((item) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <div className="font-mono text-[46px] leading-none text-chi sm:text-6xl xl:text-7xl">
                  {item.value}
                </div>
                <div className="mt-6 max-w-[230px] text-base leading-snug text-ink-dim">
                  {item.label}
                </div>
                <div className="mt-3 font-mono text-[11px] text-ink-dim/70">
                  {'// '}
                  {item.basis}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative mt-24 font-mono text-xs text-ink-dim">
          {'// без округления в сторону маркетинга'}
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