'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/components/usePrefersReducedMotion'

const words = ['археология', 'точка рычага', 'орбита', 'документация', 'рост']
const REPEATS = 8

function Run() {
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: REPEATS }, (_, group) => (
        <div key={group} className="flex items-center">
          {words.map((word) => (
            <span key={word} className="flex items-center">
              <span className="whitespace-nowrap px-5 font-mono text-sm text-ink-dim sm:text-base">
                {word}
              </span>
              <span className="text-ink-dim/50">·</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  const reduce = usePrefersReducedMotion()

  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className="relative overflow-hidden border-y border-white/[0.06] py-5 sm:py-6"
      >
        <div className="flex w-max">
          <Run />
        </div>
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/[0.06] py-5 sm:py-6"
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
      >
        <Run />
        <Run />
      </motion.div>
    </div>
  )
}