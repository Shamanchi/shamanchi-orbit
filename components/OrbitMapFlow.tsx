'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

type DotSpec = {
  offset: number
  speed: number
  size: number
  opacity: number
}

type RingSpec = {
  a: number
  b: number
  z: number
  tiltX: number
  rotZ: number
  speed: number
  opacity: number
  dots: DotSpec[]
}

// Same principle as the orbit rings that used to run behind the hero:
// tilted ellipses, dots travelling along them. More rings, more project dots,
// center (your business) is rendered by the parent as an HTML overlay.
const RINGS: RingSpec[] = [
  {
    a: 1.6, b: 1.12, z: -0.9, tiltX: 0.3, rotZ: 0.5, speed: 0.16, opacity: 0.36,
    dots: [
      { offset: 0.0, speed: 1.0, size: 0.05, opacity: 0.95 },
      { offset: 0.5, speed: 0.85, size: 0.028, opacity: 0.5 },
    ],
  },
  {
    a: 2.1, b: 1.46, z: 0.05, tiltX: 0.12, rotZ: -0.3, speed: -0.11, opacity: 0.3,
    dots: [
      { offset: 0.15, speed: 1.0, size: 0.045, opacity: 0.9 },
      { offset: 0.62, speed: 0.9, size: 0.026, opacity: 0.45 },
      { offset: 0.85, speed: 1.25, size: 0.022, opacity: 0.4 },
    ],
  },
  {
    a: 2.6, b: 1.82, z: -0.45, tiltX: 0.26, rotZ: 0.85, speed: 0.08, opacity: 0.24,
    dots: [
      { offset: 0.3, speed: 1.0, size: 0.05, opacity: 0.85 },
      { offset: 0.05, speed: 1.4, size: 0.03, opacity: 0.5 },
      { offset: 0.55, speed: 0.75, size: 0.02, opacity: 0.35 },
    ],
  },
  {
    a: 3.1, b: 2.16, z: 0.2, tiltX: 0.18, rotZ: -0.55, speed: -0.06, opacity: 0.18,
    dots: [
      { offset: 0.45, speed: 1.0, size: 0.04, opacity: 0.7 },
      { offset: 0.9, speed: 1.3, size: 0.025, opacity: 0.4 },
    ],
  },
  {
    a: 3.55, b: 2.44, z: -0.15, tiltX: 0.34, rotZ: 0.2, speed: 0.045, opacity: 0.14,
    dots: [
      { offset: 0.7, speed: 1.0, size: 0.045, opacity: 0.75 },
      { offset: 0.2, speed: 1.5, size: 0.028, opacity: 0.45 },
      { offset: 0.4, speed: 0.8, size: 0.02, opacity: 0.3 },
    ],
  },
]

function RingPath({ ring }: { ring: RingSpec }) {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, ring.a, ring.b, 0, Math.PI * 2, false, 0)
    return curve.getPoints(160).map((p) => new THREE.Vector3(p.x, p.y, 0))
  }, [ring.a, ring.b])

  const line = useMemo(
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

  return <primitive object={line} />
}

function RingDot({ ring, dot, reduced }: { ring: RingSpec; dot: DotSpec; reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const angle = useRef(dot.offset * Math.PI * 2)

  useFrame((_, delta) => {
    if (reduced) return
    angle.current += delta * ring.speed * dot.speed
    const t = angle.current
    if (mesh.current) {
      mesh.current.position.set(ring.a * Math.cos(t), ring.b * Math.sin(t), 0)
    }
  })

  const start = dot.offset * Math.PI * 2

  return (
    <mesh
      ref={mesh}
      position={[ring.a * Math.cos(start), ring.b * Math.sin(start), 0]}
    >
      <sphereGeometry args={[dot.size, 10, 10]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={dot.opacity} />
    </mesh>
  )
}

function OrbitRing({ ring, reduced }: { ring: RingSpec; reduced: boolean }) {
  return (
    <group position={[0, 0, ring.z]}>
      <group rotation={[ring.tiltX, 0, ring.rotZ]}>
        <RingPath ring={ring} />
        {ring.dots.map((dot, index) => (
          <RingDot key={index} ring={ring} dot={dot} reduced={reduced} />
        ))}
      </group>
    </group>
  )
}

export default function OrbitMapFlow({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Stars radius={55} depth={30} count={900} factor={3.2} saturation={0} fade speed={0.5} />
      {RINGS.map((ring, index) => (
        <OrbitRing key={index} ring={ring} reduced={reduced} />
      ))}
    </Canvas>
  )
}
