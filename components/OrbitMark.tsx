'use client'

import { useEffect, useState } from 'react'

export default function OrbitMark({ size = 26 }: { size?: number }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) {
      const t = window.setTimeout(() => setAnimate(true), 350)
      return () => window.clearTimeout(t)
    }
  }, [])

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
      <ellipse cx="16" cy="16" rx="13" ry="7" stroke="rgba(0, 212, 255, 0.6)" strokeWidth="1" />
      <circle cx="16" cy="16" r="2.4" fill="#E6EDF3" />
      <circle r="1.7" fill="#00D4FF">
        {animate ? (
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M 16 9 A 13 7 0 1 1 15.99 9"
          />
        ) : (
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        )}
      </circle>
    </svg>
  )
}