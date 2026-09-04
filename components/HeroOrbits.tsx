'use client'

import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export default function HeroOrbits() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Stars radius={60} depth={40} count={1600} factor={4} saturation={0} fade speed={0.5} />
    </Canvas>
  )
}