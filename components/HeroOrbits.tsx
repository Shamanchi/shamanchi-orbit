'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

type RingSpec = {
  a: number
  b: number
  z: number
  tiltX: number
  rotZ: number
  speed: number
  phase: number
  opacity: number
  dotSize: number
}

const RINGS: RingSpec[] = [
  { a: 1.55, b: 1.05, z: -1.2, tiltX: 0.22, rotZ: 0.4, speed: 0.16, phase: 0.4, opacity: 0.4, dotSize: 0.05 },
  { a: 2.15, b: 1.45, z: 0.1, tiltX: 0.12, rotZ: -0.3, speed: -0.11, phase: 1.9, opacity: 0.3, dotSize: 0.045 },
  { a: 2.85, b: 1.9, z: -0.6, tiltX: 0.3, rotZ: 0.9, speed: 0.07, phase: 3.4, opacity: 0.24, dotSize: 0.04 },
]

function OrbitRing({ ring }: { ring: RingSpec }) {
  const dot = useRef<THREE.Mesh>(null)
  const angle = useRef(ring.phase)

  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, ring.a, ring.b, 0, Math.PI * 2, false, 0)
    return curve.getPoints(140).map((p) => new THREE.Vector3(p.x, p.y, 0))
  }, [ring.a, ring.b])

  const lineObject = useMemo(
    () =>
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: new THREE.Color('#00D4FF'),
          transparent: true,
          opacity: ring.opacity,
        })
      ),
    [points, ring.opacity]
  )

  useFrame((_, delta) => {
    angle.current += delta * ring.speed
    const t = angle.current
    if (dot.current) {
      dot.current.position.set(ring.a * Math.cos(t), ring.b * Math.sin(t), 0)
    }
  })

  return (
    <group position={[0, 0, ring.z]}>
      <group rotation={[ring.tiltX, 0, ring.rotZ]}>
        <primitive object={lineObject} />
        <mesh ref={dot}>
          <sphereGeometry args={[ring.dotSize, 12, 12]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.95} />
        </mesh>
      </group>
    </group>
  )
}

export default function HeroOrbits() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Stars radius={60} depth={40} count={1600} factor={4} saturation={0} fade speed={0.5} />
      {RINGS.map((ring, i) => (
        <OrbitRing key={i} ring={ring} />
      ))}
    </Canvas>
  )
}