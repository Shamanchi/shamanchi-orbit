'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Particles, ParticlesProvider } from '@tsparticles/react'
import type { Engine } from '@tsparticles/engine'
import { loadStarsPreset } from '@tsparticles/preset-stars'

const HeroOrbits = dynamic(() => import('@/components/HeroOrbits'), {
  ssr: false,
  loading: () => null,
})

type Mode = 'idle' | 'webgl' | 'particles' | 'css'

function StarsParticles() {
  const init = async (engine: Engine) => {
    await loadStarsPreset(engine)
  }
  return (
    <ParticlesProvider init={init}>
      <Particles
        id="stars-fallback"
        className="absolute inset-0 h-full w-full"
        options={{
          preset: 'stars',
          fullScreen: { enable: false },
          background: { color: 'transparent' },
          fpsLimit: 45,
          detectRetina: true,
          particles: {
            number: { value: 60, density: { enable: true, width: 1920, height: 1080 } },
            color: { value: '#E6EDF3' },
            opacity: { value: { min: 0.15, max: 0.85 } },
            size: { value: { min: 0.5, max: 1.5 } },
            move: { enable: true, speed: 0.3, outModes: { default: 'out' } },
          },
        }}
      />
    </ParticlesProvider>
  )
}

export default function SpaceBackdrop() {
  const [mode, setMode] = useState<Mode>('idle')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768

    if (reduced || mobile) {
      setMode('css')
      return
    }

    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      if (gl && typeof WebGLRenderingContext !== 'undefined') {
        setMode('webgl')
        return
      }
    } catch {
      // WebGL is unavailable, fall through to tsParticles
    }

    setMode('particles')
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {mode === 'webgl' ? (
        <HeroOrbits />
      ) : mode === 'particles' ? (
        <StarsParticles />
      ) : (
        <div className="stars-static absolute inset-0" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#0B1120]" />
    </div>
  )
}