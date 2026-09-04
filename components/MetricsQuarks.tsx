'use client'

import { useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { QuarksProvider, ParticleSystem } from 'quarks.r3f'
import { SphereEmitter, RenderMode, ConstantValue } from 'three.quarks'
import * as THREE from 'three'

export default function MetricsQuarks() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 3400)
    return () => window.clearTimeout(timer)
  }, [])

  const material = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
    }
    const texture = new THREE.CanvasTexture(canvas)
    return new THREE.MeshBasicMaterial({
      map: texture,
      color: new THREE.Color('#00D4FF'),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  }, [])

  const shape = useMemo(() => new SphereEmitter({ radius: 0.25 }), [])

  if (!visible) {
    return null
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <QuarksProvider>
        <ParticleSystem
          autoDestroy
          duration={1.2}
          looping={false}
          emissionOverTime={0}
          emissionBursts={[
            {
              time: 0,
              count: new ConstantValue(160),
              cycle: 1,
              interval: 0,
              probability: 1,
            },
          ]}
          startLife={[0.8, 1.6]}
          startSpeed={[1.6, 3.4]}
          startSize={[0.14, 0.36]}
          startColor={{ r: 0, g: 0.83, b: 1, a: 1 }}
          shape={shape}
          material={material}
          renderMode={RenderMode.BillBoard}
          autoPlay
        />
      </QuarksProvider>
    </Canvas>
  )
}