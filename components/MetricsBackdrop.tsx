'use client'

import { useEffect, useRef } from 'react'

const DOT_COUNT = 24
const DOT_RGB = '139, 152, 169'
const DOT_ACCENT_RGB = '0, 212, 255'
const LINE_RGB = '0, 212, 255'
const PULSE_MS = 1400

type Point = { x: number; y: number; r: number; accent: boolean }

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
      r: 0.8 + Math.random() * 0.7,
      accent: points.length < 3,
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
 * Metrics section backdrop: distant static space (dimmer, smaller dots than
 * the site constellation) plus one thin orbit line behind the digits.
 * While the counters run, a single cyan impulse travels left to right along
 * the top arc and stops at the right end. Nothing else moves here.
 */
export default function MetricsBackdrop({
  play,
  reduced,
}: {
  play: boolean
  reduced: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<Scene | null>(null)
  const drawRef = useRef<((pulseT: number | null) => void) | null>(null)

  // Static scene: far-space dots + the orbit line. Pulse drawn on demand.
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

      const draw = (pulseT: number | null) => {
        const { points } = scene
        context.clearRect(0, 0, scene.width, scene.height)

        for (const p of points) {
          context.beginPath()
          context.arc(p.x * scene.width, p.y * scene.height, p.r, 0, Math.PI * 2)
          context.fillStyle = p.accent
            ? `rgba(${DOT_ACCENT_RGB}, 0.5)`
            : `rgba(${DOT_RGB}, 0.42)`
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

        if (pulseT === null) return
        const angle = Math.PI * (1 - pulseT)
        const px = cx + rx * Math.cos(angle)
        const py = cy - ry * Math.sin(angle)
        const glow = context.createRadialGradient(px, py, 0, px, py, 18)
        glow.addColorStop(0, 'rgba(0, 212, 255, 0.5)')
        glow.addColorStop(1, 'rgba(0, 212, 255, 0)')
        context.fillStyle = glow
        context.beginPath()
        context.arc(px, py, 18, 0, Math.PI * 2)
        context.fill()
        context.beginPath()
        context.arc(px, py, 2.8, 0, Math.PI * 2)
        context.fillStyle = '#E6FDFF'
        context.fill()
      }

      drawRef.current = draw
      draw(null)
    }

    setup()
    window.addEventListener('resize', setup)
    return () => window.removeEventListener('resize', setup)
  }, [])

  // One impulse while counters are running, then it rests at the right end.
  useEffect(() => {
    if (!play || reduced) return
    const startedAt = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / PULSE_MS)
      const eased = 1 - Math.pow(1 - progress, 2.2)
      if (drawRef.current) drawRef.current(eased)
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else if (drawRef.current) {
        drawRef.current(1)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [play, reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}