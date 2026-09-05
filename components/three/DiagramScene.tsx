'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import * as THREE from 'three'

// Task-9 experiment: the "restored flow" state as a real 3D gravity system.
// WebGL-only — OrbitMap keeps the 2D SVG fallback for the rest. The camera
// pulls back automatically on narrow panels so the whole orbit stays visible.

const CYAN = '#00D4FF'
const ICE = '#BFE3FF'
const DIM = '#8B98A9'
const OUTER_R = 6.0 // systems orbit
const INNER_R = 3.95 // actions orbit
const TSEG = 1.15 // seconds to travel one straight node-to-node segment
const NODE_DWELL = 0.24 // the pulse stops inside the node it has reached
const FLASH_MS = 0.55 // node "hit" flash duration
const CAM_POS = new THREE.Vector3(0, 5.1, 9.7)
const CAM_HALF_TAN = Math.tan(THREE.MathUtils.degToRad(45) / 2)

type StepType = 'system' | 'action'

type Step = {
  name: string
  sub: string
  type: StepType
  person?: boolean
}

// Same closed data loop as the 2D version: 1C -> ... -> 1C.
const STEPS: Step[] = [
  { name: '1С', sub: 'заявка · остатки', type: 'system' },
  { name: 'CRM', sub: 'карточка клиента', type: 'system' },
  { name: 'Telegram', sub: 'уведомление менеджеру', type: 'action' },
  { name: 'AI-ассистент', sub: 'типовые вопросы', type: 'action' },
  { name: 'Менеджер', sub: 'только сложные · контекст', type: 'action', person: true },
  { name: 'Ответ клиенту', sub: '', type: 'action' },
  { name: 'Google Sheets', sub: 'отчёт', type: 'system' },
  { name: 'Аналитика', sub: 'точка рычага', type: 'system' },
]

const NODE_POSITIONS: THREE.Vector3[] = STEPS.map((step, index) => {
  const angle = (index * Math.PI) / 4
  const radius = step.type === 'system' ? OUTER_R : INNER_R
  return new THREE.Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle))
})

type RingSpec = {
  radius: number
  tiltX?: number
  tiltZ?: number
  y?: number
  color: string
  opacity: number
  width: number
}

const RINGS: RingSpec[] = [
  { radius: OUTER_R, color: DIM, opacity: 0.3, width: 0.035 },
  { radius: INNER_R, color: CYAN, opacity: 0.22, width: 0.028 },
  { radius: 7.15, tiltX: 0.4, tiltZ: 0.22, y: 0.18, color: CYAN, opacity: 0.12, width: 0.02 },
  { radius: 2.55, tiltX: 0.52, tiltZ: -0.6, y: -0.12, color: DIM, opacity: 0.24, width: 0.02 },
]

function ringPoints(spec: RingSpec) {
  const points: THREE.Vector3[] = []
  const segments = 192
  const tilt = new THREE.Euler(spec.tiltX ?? 0, 0, spec.tiltZ ?? 0)
  const quat = new THREE.Quaternion().setFromEuler(tilt)
  for (let i = 0; i <= segments; i++) {
    const phi = (i / segments) * Math.PI * 2
    const p = new THREE.Vector3(spec.radius * Math.cos(phi), spec.y ?? 0, spec.radius * Math.sin(phi))
    p.applyQuaternion(quat)
    points.push(p)
  }
  return points
}

function makeGlowTexture(inner = 'rgba(255,255,255,0.9)', mid = 'rgba(0,212,255,0.45)') {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    gradient.addColorStop(0, inner)
    gradient.addColorStop(0.25, mid)
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 128, 128)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function Rings() {
  const points = useMemo(() => RINGS.map((ring) => ringPoints(ring)), [])
  return (
    <>
      {RINGS.map((ring, i) => (
        <Line
          key={i}
          points={points[i]}
          color={ring.color}
          transparent
          opacity={ring.opacity}
          lineWidth={ring.width}
          depthWrite={false}
        />
      ))}
    </>
  )
}

type NodeVisual = {
  core: THREE.Color
  halo: THREE.Color
  scale: number
}

const NODE_VISUALS: NodeVisual[] = STEPS.map((step) => {
  if (step.person) return { core: new THREE.Color('#E6FDFF'), halo: new THREE.Color('#8FD8FF'), scale: 0.34 }
  if (step.type === 'system') return { core: new THREE.Color(ICE), halo: new THREE.Color('#3FA9E8'), scale: 0.27 }
  return { core: new THREE.Color(CYAN), halo: new THREE.Color('#00A9D8'), scale: 0.21 }
})

const IDENTITY_QUAT = new THREE.Quaternion()
const WHITE = new THREE.Color('#FFFFFF')

// Point on the closed straight route: from node[seg] towards node[seg+1].
function pathPoint(seg: number, u: number, out: THREE.Vector3) {
  const a = NODE_POSITIONS[seg]
  const b = NODE_POSITIONS[(seg + 1) % NODE_POSITIONS.length]
  out.copy(a).lerp(b, u)
}

function NodeInstances({ meshRef }: { meshRef: MutableRefObject<THREE.InstancedMesh | null> }) {
  useLayoutEffect(() => {
    const instance = meshRef.current
    if (!instance) return
    const matrix = new THREE.Matrix4()
    NODE_POSITIONS.forEach((pos, i) => {
      const scale = NODE_VISUALS[i].scale
      matrix.compose(pos, IDENTITY_QUAT, new THREE.Vector3(scale, scale, scale))
      instance.setMatrixAt(i, matrix)
      instance.setColorAt(i, NODE_VISUALS[i].core)
    })
    instance.instanceMatrix.needsUpdate = true
    if (instance.instanceColor) instance.instanceColor.needsUpdate = true
  }, [meshRef])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, STEPS.length]} frustumCulled={false}>
      <sphereGeometry args={[1, 20, 20]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

// Soft additive halo around every planet (node).
function NodeHalos({ geometryRef }: { geometryRef: MutableRefObject<THREE.BufferGeometry | null> }) {
  const glow = useMemo(makeGlowTexture, [])
  const positions = useMemo(() => {
    const array = new Float32Array(NODE_POSITIONS.length * 3)
    NODE_POSITIONS.forEach((p, i) => {
      array[i * 3] = p.x
      array[i * 3 + 1] = p.y
      array[i * 3 + 2] = p.z
    })
    return array
  }, [])
  const colors = useMemo(() => {
    const array = new Float32Array(NODE_POSITIONS.length * 3)
    NODE_VISUALS.forEach((v, i) => {
      const c = v.halo.clone().lerp(WHITE, 0.32)
      array[i * 3] = c.r
      array[i * 3 + 1] = c.g
      array[i * 3 + 2] = c.b
    })
    return array }, [])
  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={glow}
        size={2.5}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}

// Straight route along the node order, closed.
function RouteLine() {
  const points = useMemo(() => [...NODE_POSITIONS, NODE_POSITIONS[0]], [])
  return (
    <Line
      points={points}
      color={CYAN}
      transparent
      opacity={0.18}
      lineWidth={0.02}
      depthWrite={false}
    />
  )
}

// One glowing pulse: travels straight node-to-node, stops INSIDE each node
// it reaches and flashes that node at the exact same moment.
function Pulses({
  animated,
  nodeMesh,
  haloGeometryRef,
}: {
  animated: boolean
  nodeMesh: MutableRefObject<THREE.InstancedMesh | null>
  haloGeometryRef: MutableRefObject<THREE.BufferGeometry | null>
}) {
  const pulseRef = useRef<THREE.Sprite>(null)
  const glow = useMemo(() => makeGlowTexture('rgba(255,255,255,1)', 'rgba(170,238,255,0.6)'), [])
  const segRef = useRef(0)
  const uRef = useRef(0)
  const modeRef = useRef<'move' | 'dwell'>('move')
  const dwellRef = useRef(0)
  const flashRef = useRef<{ index: number; t0: number }>({ index: -1, t0: 0 })
  const matrix = useMemo(() => new THREE.Matrix4(), [])
  const vector = useMemo(() => new THREE.Vector3(), [])
  const scaleVec = useMemo(() => new THREE.Vector3(), [])

  const writeNodes = (flashIndex: number, flashP: number) => {
    const instance = nodeMesh.current
    if (instance) {
      for (let i = 0; i < STEPS.length; i++) {
        const base = NODE_VISUALS[i]
        let scale = base.scale
        let color = base.core
        if (i === flashIndex) {
          const bump = 1 + 0.9 * Math.sin(Math.PI * Math.min(1, flashP))
          scale = base.scale * bump
          color = base.core.clone().lerp(WHITE, Math.min(1, flashP))
        }
        matrix.compose(NODE_POSITIONS[i], IDENTITY_QUAT, new THREE.Vector3(scale, scale, scale))
        instance.setMatrixAt(i, matrix)
        instance.setColorAt(i, color)
      }
      instance.instanceMatrix.needsUpdate = true
      if (instance.instanceColor) instance.instanceColor.needsUpdate = true
    }
    const geometry = haloGeometryRef.current
    if (geometry) {
      const colorAttr = geometry.getAttribute('color') as THREE.BufferAttribute
      if (colorAttr) {
        for (let i = 0; i < STEPS.length; i++) {
          const halo = NODE_VISUALS[i].halo
          const boost = i === flashIndex ? 0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, flashP)) : 0
          colorAttr.setXYZ(
            i,
            Math.min(1.5, halo.r + boost),
            Math.min(1.5, halo.g + boost),
            Math.min(1.5, halo.b + boost)
          )
        }
        colorAttr.needsUpdate = true
      }
    }
  }

  useFrame((state, delta) => {
    if (!animated) return
    const now = state.clock.elapsedTime

    if (modeRef.current === 'move') {
      uRef.current += delta / TSEG
      if (uRef.current >= 1) {
        uRef.current = 1
        const arrived = (segRef.current + 1) % NODE_POSITIONS.length
        flashRef.current = { index: arrived, t0: now }
        modeRef.current = 'dwell'
        dwellRef.current = NODE_DWELL
      }
    } else {
      dwellRef.current -= delta
      if (dwellRef.current <= 0) {
        modeRef.current = 'move'
        segRef.current = (segRef.current + 1) % NODE_POSITIONS.length
        uRef.current = 0
      }
    }

    // Pulse position: exactly on the straight segment, or inside the node during dwell.
    pathPoint(segRef.current, uRef.current, vector)

    const pulse = pulseRef.current
    if (pulse) {
      pulse.position.copy(vector)
      const scl = modeRef.current === 'dwell' ? 1.1 : 0.8
      scaleVec.set(scl, scl, 1)
      pulse.scale.copy(scaleVec)
    }

    // Node flash fires exactly when the pulse arrives and stays for FLASH_MS.
    const flash = flashRef.current
    const flashP = now - flash.t0
    const activeFlash = flash.index >= 0 && flashP < FLASH_MS ? flash.index : -1
    if (activeFlash === -1 && flash.index >= 0) {
      flashRef.current = { index: -1, t0: 0 }
    }
    writeNodes(activeFlash, activeFlash === -1 ? 0 : flashP / FLASH_MS)
  })

  return (
    <sprite ref={pulseRef}>
      <spriteMaterial
        map={glow}
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  )
}

// Warm, dim "sun" for the business at the center — not a loud yellow.
function CenterMass() {
  const warmGlow = useMemo(
    () => makeGlowTexture('rgba(255,242,214,0.95)', 'rgba(255,186,104,0.42)'),
    []
  )
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.36, 24, 24]} />
        <meshBasicMaterial color="#FFDCA4" toneMapped={false} />
      </mesh>
      <sprite scale={[2.3, 2.3, 1]}>
        <spriteMaterial
          map={warmGlow}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  )
}

// Labels sit NEXT TO their object. Near-side nodes (bottom-right of the
// picture) and the right node would push text outside the panel, so for them
// the label is pulled back towards the center and lifted above the sphere.
function nodeLabelPosition(index: number): [number, number, number] {
  const angle = (index * Math.PI) / 4
  const pos = NODE_POSITIONS[index]
  const nearBottom = Math.sin(angle) > 0.001
  const rightSide = index === 0
  if (nearBottom || rightSide) {
    const pull = rightSide ? 0.76 : 0.92
    const lift = rightSide ? 1.12 : 0.8
    return [pos.x * pull, lift, pos.z * pull]
  }
  const radius = STEPS[index].type === 'system' ? OUTER_R + 0.9 : INNER_R + 0.9
  return [radius * Math.cos(angle), 0.5, radius * Math.sin(angle)]
}

function CenterLabel() {
  return (
    <Html
      position={[1.9, 1.05, 0.2]}
      center
      zIndexRange={[30, 0]}
      style={{ pointerEvents: 'none' }}
    >
      <div className="pointer-events-none flex select-none flex-col items-center leading-none">
        <span className="whitespace-nowrap font-display text-[17px] font-semibold tracking-tight text-chi [text-shadow:0_0_14px_#070C15,0_0_40px_rgba(0,212,255,0.45)]">
          ваш бизнес
        </span>
        <span className="mt-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] text-chi/80 [text-shadow:0_0_10px_#070C15]">
          центр системы
        </span>
      </div>
    </Html>
  )
}

function NodeLabels() {
  return (
    <>
      {STEPS.map((step, index) => {
        const number = String(index + 1).padStart(2, '0')
        return (
          <Html
            key={step.name}
            position={nodeLabelPosition(index)}
            center
            zIndexRange={[30, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <div className="pointer-events-none flex select-none flex-col items-center leading-none">
              <span className="font-mono text-[9px] tracking-wide text-ink-dim/90 [text-shadow:0_0_12px_#070C15]">
                {number}
              </span>
              <span
                className={
                  'mt-1 whitespace-nowrap font-mono text-[12px] tracking-tight [text-shadow:0_0_12px_#070C15] ' +
                  (step.person ? 'text-chi' : 'text-ink')
                }
              >
                {step.name}
              </span>
              {step.sub ? (
                <span className="mt-1 whitespace-nowrap font-mono text-[9px] text-ink-dim/90 [text-shadow:0_0_12px_#070C15]">
                  {step.sub}
                </span>
              ) : null}
              {step.person ? (
                <span className="mt-1 whitespace-nowrap font-mono text-[9px] text-chi/90 [text-shadow:0_0_12px_#070C15]">
                  [ человек в цепи ]
                </span>
              ) : null}
            </div>
          </Html>
        )
      })}
    </>
  )
}

function System({ animated }: { animated: boolean }) {
  const nodeMesh = useRef<THREE.InstancedMesh>(null)
  const haloGeometryRef = useRef<THREE.BufferGeometry>(null)
  return (
    <group>
      <Rings />
      <RouteLine />
      <NodeInstances meshRef={nodeMesh} />
      <NodeHalos geometryRef={haloGeometryRef} />
      <NodeLabels />
      <CenterLabel />
      <CenterMass />
      <Pulses animated={animated} nodeMesh={nodeMesh} haloGeometryRef={haloGeometryRef} />
    </group>
  )
}

function CameraRig({ animated }: { animated: boolean }) {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const pointer = useRef({ x: 0, y: 0 })
  const target = useMemo(() => new THREE.Vector3(), [])

  // Pull the camera back on narrow panels (mobile) so the whole orbit
  // system — including the outer labels — stays inside the window.
  const baseDistance = useMemo(() => {
    const aspect = size.height > 0 ? size.width / size.height : 1
    const fit = 5.7 / (CAM_HALF_TAN * aspect)
    return Math.min(20, Math.max(9.6, fit))
  }, [size.width, size.height])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame(() => {
    if (!animated) {
      camera.position.set(CAM_POS.x, CAM_POS.y, baseDistance)
      camera.lookAt(0, 0, 0)
      return
    }
    target.set(
      CAM_POS.x + pointer.current.x * 0.55,
      CAM_POS.y + pointer.current.y * 0.3,
      baseDistance
    )
    camera.position.lerp(target, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function DiagramScene({ reduced = false }: { reduced?: boolean }) {
  const animated = !reduced
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [CAM_POS.x, CAM_POS.y, CAM_POS.z], fov: 45, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <CameraRig animated={animated} />
      <System animated={animated} />
    </Canvas>
  )
}
