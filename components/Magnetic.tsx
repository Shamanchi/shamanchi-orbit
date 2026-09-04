'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'

export default function Magnetic({
  children,
  className = '',
  strength = 5,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 })

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setFinePointer(true)
    }
  }, [])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !finePointer || reducedMotion) return
    const rect = el.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    const halfWidth = Math.max(rect.width / 2, 1)
    const halfHeight = Math.max(rect.height / 2, 1)
    x.set(Math.max(-1, Math.min(1, dx / halfWidth)) * strength)
    y.set(Math.max(-1, Math.min(1, dy / halfHeight)) * strength)
  }

  const resetPosition = () => {
    x.set(0)
    y.set(0)
  }

  const interactive = finePointer && !reducedMotion

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        whileHover={
          interactive
            ? {
                scale: 1.03,
                boxShadow:
                  '0 18px 45px -12px rgba(2, 6, 16, 0.8), 0 0 0 1px rgba(0, 212, 255, 0.15)',
              }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {children}
      </motion.div>
    </div>
  )
}