'use client'

import { useEffect, useRef } from 'react'

const DOT_COUNT = 24
const DOT_RGB = '139, 152, 169'
const DOT_ACCENT_RGB = '0, 212, 255'
const LINE_RGB = '0, 212, 255'
const ORBIT_MS = 64000

type Point = {
  x: number
  y: number
  r: number
  accent: boolean
  phase: number
  rate: number
}

function seedPoints(width: number, height: number): Point[] {
  const points: Point[] = []
  const gap = Math.min(width, height) * 0.06
  let attempts = 0
  while (points.length < DOT_COUNT && attempts < DOT_COUNT * 200) {
    attempts += 1
    const x = 0.04 + Math.random() * 0.92
    const y = 0.06 + Math.random() * 0.88
    let tooClose = false
    for (const p of points) {
      if (Math.hypot((p.x - x) * width, (p.y - y) * height) < gap) {
        tooClose = true
        break
      }
    }
    if (tooClose) continue
    points.push({
      x,
      y,
      r: 0.9 + Math.random() * 0.8,
      accent: points.length < 3,
      phase: Math.random() * Math.PI * 2,
      rate: 0.0018 + Math.random() * 0.0022,
    })
  }
  return points
}

type Scene = {
  points: Point[]
  width: number
  height: number
}

/**
 * Metrics section backdrop: a living far-space field matching the site
 * constellation. The dots breathe visibly (same brightness as the backdrop:
 * 0.8 gray / 0.95 cyan, accent dots with a pulsing halo), and one thin cyan
 * orbit line runs behind the digits with a small cyan sphere travelling
 * along it slowly. The loop only runs while the section is on screen and
 * never under reduced motion — there the scene is drawn once, static, with
 * the sphere resting on the orbit.
 */
export default function MetricsBackdrop({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<Scene | null>(null)
  const drawRef = useRef<((timeMs: number | null) => void) | null>(null)

  // Build the scene once; drawRef renders dots, orbit and sphere.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const setup = () => {
      const bounds = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.round(bounds.width))
      const height = Math.max(1, Math.round(bounds.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bufferWidth = Math.round(width * dpr)
      const bufferHeight = Math.round(height * dpr)
      if (canvas.width !== bufferWidth) canvas.width = bufferWidth
      if (canvas.height !== bufferHeight) canvas.height = bufferHeight
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const scene: Scene = {
        points: seedPoints(width, height),
        width,
        height,
      }
      sceneRef.current = scene

      const draw = (timeMs: number | null) => {
        const { points } = scene
        context.clearRect(0, 0, scene.width, scene.height)
        const alive = timeMs !== null

        // Accent halos first, then all cores, mirroring ConstellationBackdrop.
        if (alive) {
          for (const p of points) {
            if (!p.accent) continue
            const sx = p.x * scene.width
            const sy = p.y * scene.height
            const pulse = 0.72 + 0.28 * Math.sin(timeMs / 900 + p.phase)
            const halo = context.createRadialGradient(sx, sy, 0, sx, sy, 8)
            halo.addColorStop(0, `rgba(${DOT_ACCENT_RGB}, ${(0.42 * pulse).toFixed(3)})`)
            halo.addColorStop(1, `rgba(${DOT_ACCENT_RGB}, 0)`)
            context.fillStyle = halo
            context.beginPath()
            context.arc(sx, sy, 8, 0, Math.PI * 2)
            context.fill()
          }
        }

        for (const p of points) {
          const rgb = p.accent ? DOT_ACCENT_RGB : DOT_RGB
          const base = p.accent ? 0.95 : 0.8
          const twinkle = alive
            ? 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(timeMs * p.rate + p.phase))
            : 1
          context.beginPath()
          context.arc(
            p.x * scene.width,
            p.y * scene.height,
            p.accent ? 2.2 : p.r,
            0,
            Math.PI * 2
          )
          context.fillStyle = `rgba(${rgb}, ${(base * twinkle).toFixed(3)})`
          context.fill()
        }

        const cx = scene.width / 2
        const cy = scene.height * 0.46
        const rx = Math.max(40, scene.width / 2 - 36)
        const ry = Math.max(20, scene.height * 0.27)
        context.lineWidth = 1
        context.strokeStyle = `rgba(${LINE_RGB}, 0.16)`
        context.beginPath()
        context.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        context.stroke()

        const progress = alive ? (timeMs / ORBIT_MS) % 1 : 0
        const angle = -Math.PI * 2 * progress
        const px = cx + rx * Math.cos(angle)
        const py = cy - ry * Math.sin(angle)

        const glow = context.createRadialGradient(px, py, 0, px, py, 24)
        glow.addColorStop(0, 'rgba(0, 212, 255, 0.4)')
        glow.addColorStop(1, 'rgba(0, 212, 255, 0)')
        context.fillStyle = glow
        context.beginPath()
        context.arc(px, py, 24, 0, Math.PI * 2)
        context.fill()

        const sphere = context.createRadialGradient(px - 1.4, py - 1.4, 0, px, py, 5)
        sphere.addColorStop(0, '#F2FEFF')
        sphere.addColorStop(0.45, '#00D4FF')
        sphere.addColorStop(1, 'rgba(0, 212, 255, 0.55)')
        context.fillStyle = sphere
        context.beginPath()
        context.arc(px, py, 5, 0, Math.PI * 2)
        context.fill()
      }

      drawRef.current = draw
      draw(null)
    }

    setup()
    window.addEventListener('resize', setup)
    return () => window.removeEventListener('resize', setup)
  }, [])

  // Ambient loop: twinkle + slow sphere, only while visible, off for reduced.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    let frame = 0
    const tick = (now: number) => {
      if (drawRef.current) drawRef.current(now)
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(tick)
        } else {
          cancelAnimationFrame(frame)
        }
      },
      { rootMargin: '150px 0px' }
    )
    observer.observe(canvas)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}