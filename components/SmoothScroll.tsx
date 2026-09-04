'use client'

import { ReactLenis } from 'lenis/react'

const LENIS_OPTIONS = {
  autoRaf: true,
  duration: 1.1,
  anchors: true,
  respectReducedMotion: true,
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  )
}
