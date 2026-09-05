'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import OrbitMapShards from '@/components/OrbitMapShards'
import { usePrefersReducedMotion } from '@/components/usePrefersReducedMotion'

const OrbitMapFlow = dynamic(() => import('@/components/OrbitMapFlow'), {
  ssr: false,
  loading: () => null,
})

const DiagramScene = dynamic(() => import('@/components/three/DiagramScene'), {
  ssr: false,
  loading: () => null,
})

const toggleClass = (active: boolean) =>
  `rounded-sm border px-5 py-2.5 font-mono text-xs transition-colors ${
    active
      ? 'border-white/[0.3] text-ink'
      : 'border-white/[0.1] text-ink-dim hover:border-white/[0.2] hover:text-ink'
  }`

export default function OrbitMap() {
  const [flow, setFlow] = useState(false)
  const reduce = usePrefersReducedMotion()
  const [webgl, setWebgl] = useState(false)
  const capable3d = webgl && !reduce

  useEffect(() => {
    if (reduce || typeof window === 'undefined') return
    try {
      const probe = document.createElement('canvas')
      const gl = probe.getContext('webgl2') || probe.getContext('webgl')
      if (gl) setWebgl(true)
    } catch {
      // WebGL is unavailable — stay on the 2D diagram
    }
  }, [reduce])

  const diagram = flow ? (
    <div key="flow" className="absolute inset-0" role="img" aria-label="Состояние после: проекты движутся по орбитам вокруг вашего бизнеса">
      {capable3d ? <DiagramScene /> : <OrbitMapFlow reduced={reduce} />}
      {!capable3d && (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center md:flex"
      >
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.10),transparent_70%)]" />
        <div
          className="relative flex flex-col items-center"
          style={{ transform: 'translate(206px, -34px)' }}
        >
          <span
            className="relative font-display text-lg font-semibold tracking-tight text-chi sm:text-2xl"
            style={{ textShadow: '0 1px 2px rgba(7,12,21,0.9), 0 0 14px rgba(7,12,21,0.7), 0 0 46px rgba(0,212,255,0.55)' }}
          >
            ваш бизнес
          </span>
          <span className="relative mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-chi/75">
            центр системы
          </span>
        </div>
      </div>
      )}
    </div>
  ) : (
    <div key="broken" className="absolute inset-0">
      <OrbitMapShards />
    </div>
  )

  return (
    <section id="orbit-map" className="relative py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <Reveal className="max-w-3xl">
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
          </Reveal>
          <div className="flex items-center gap-2" role="group" aria-label="Переключение диаграммы">
            <button type="button" onClick={() => setFlow(false)} aria-pressed={!flow} className={toggleClass(!flow)}>
              Разорванные узлы
            </button>
            <button type="button" onClick={() => setFlow(true)} aria-pressed={flow} className={toggleClass(flow) + (flow ? '' : ' btn-invite')}>
              Восстановленный поток
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-md border border-white/[0.06]">
          <div className="relative h-[300px] w-full sm:h-[440px] md:aspect-[800/470] md:h-auto">
            {reduce ? (
              diagram
            ) : (
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={flow ? 'flow' : 'broken'}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {diagram}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        <p className="mt-5 font-mono text-xs text-ink-dim">
          {flow ? (
            <>
              поток: <span className="text-ink">8 шагов по замкнутому циклу</span> — заявка → ответ → отчёт → аналитика → снова 1С
            </>
          ) : (
            <>
              связи: <span className="text-ink">0</span> · каждая система держит данные при себе
            </>
          )}
        </p>
      </div>
    </section>
  )
}
