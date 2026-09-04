'use client'

import dynamic from 'next/dynamic'
import Reveal from '@/components/Reveal'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const QuarksBurst = dynamic(() => import('@/components/MetricsQuarks'), {
  ssr: false,
  loading: () => null,
})

const metrics = [
  {
    key: 'orbits',
    target: 47,
    suffix: '+',
    label: 'орбит запущено',
    basis: 'накопительно',
    count: true,
    accent: false,
  },
  {
    key: 'hours',
    target: 1200,
    suffix: '+',
    label: 'часов внимания возвращено',
    basis: 'за 2 года',
    count: true,
    accent: false,
  },
  {
    key: 'collapses',
    target: 0,
    suffix: '',
    label: 'критических коллапсов',
    basis: 'благодаря резервным орбитам',
    count: false,
    accent: true,
  },
  {
    key: 'returning',
    target: 78,
    suffix: '%',
    label: 'возвращаются за следующей орбитой',
    basis: 'из прошедших аудит',
    count: true,
    accent: false,
  },
]

function MetricValue({ metric }: { metric: (typeof metrics)[number] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(metric.target)

  useEffect(() => {
    if (!inView || reducedMotion || !metric.count) return

    let frame = 0
    const startedAt = performance.now()
    const duration = 1350

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(metric.target * eased))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reducedMotion, metric.count, metric.target])

  return (
    <div
      ref={ref}
      className={`font-mono text-[52px] leading-none tracking-tight sm:text-6xl xl:text-[76px] ${
        metric.accent ? 'text-chi' : 'text-ink'
      }`}
    >
      {value}
      {metric.suffix}
    </div>
  )
}

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
    <section
      id="metrics"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050A14] py-40 lg:py-64"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div className="grid-12" aria-hidden="true" />

        <Reveal className="relative mb-24 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              05 · метрики
            </span>
          </div>
          <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Телеметрия, а не реклама
          </h2>
        </Reveal>

        <div className="relative border-t border-white/[0.06] pt-16 lg:pt-20">
          <div className="grid grid-cols-1 gap-y-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-0">
            {metrics.map((metric) => (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <MetricValue metric={metric} />
                <div className="mt-6 max-w-[230px] text-base leading-snug text-ink-dim">
                  {metric.label}
                </div>
                <div className="mt-3 font-mono text-[11px] text-ink-dim/70">
                  {'// '}
                  {metric.basis}
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