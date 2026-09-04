'use client'

import { useEffect, useRef } from 'react'

const BASE_RGB = '139, 152, 169'
const ACCENT_RGB = '0, 212, 255'
const LINE_RGB = '0, 212, 255'
const COUNT = 13
const ACCENT_COUNT = 2
const LINE_ALPHA = 0.05

function seed(count: number, width: number, height: number) {
  const points: Array<{ x: number; y: number; accent: boolean }> = []
  const gap = Math.min(width, height) * 0.05
  let attempts = 0
  while (points.length < count && attempts < count * 200) {
    attempts += 1
    const x = 0.06 + Math.random() * 0.88
    const y = 0.1 + Math.random() * 0.8
    let tooClose = false
    for (const p of points) {
      const dx = (p.x - x) * width
      const dy = (p.y - y) * height
      if (Math.hypot(dx, dy) < gap) {
        tooClose = true
        break
      }
    }
    if (tooClose) continue
    points.push({ x, y, accent: points.length < ACCENT_COUNT })
  }
  return points
}

/**
 * Very dim static constellation behind the audit summary window.
 * Readability of the summary text has priority, so nothing moves here.
 */
export default function AuditStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const draw = () => {
      const bounds = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.round(bounds.width))
      const height = Math.max(1, Math.round(bounds.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bufferWidth = Math.round(width * dpr)
      const bufferHeight = Math.round(height * dpr)
      if (canvas.width !== bufferWidth) canvas.width = bufferWidth
      if (canvas.height !== bufferHeight) canvas.height = bufferHeight
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      const points = seed(COUNT, width, height)
      const link = Math.min(width, height) * 0.3

      context.lineWidth = 1
      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i]
          const b = points[j]
          const dx = (a.x - b.x) * width
          const dy = (a.y - b.y) * height
          const distance = Math.hypot(dx, dy)
          if (distance >= link) continue
          context.strokeStyle = `rgba(${LINE_RGB}, ${LINE_ALPHA})`
          context.beginPath()
          context.moveTo(a.x * width, a.y * height)
          context.lineTo(b.x * width, b.y * height)
          context.stroke()
        }
      }

      for (const point of points) {
        const sx = point.x * width
        const sy = point.y * height
        context.beginPath()
        context.arc(sx, sy, point.accent ? 1.7 : 1.2, 0, Math.PI * 2)
        context.fillStyle = point.accent
          ? `rgba(${ACCENT_RGB}, 0.65)`
          : `rgba(${BASE_RGB}, 0.5)`
        context.fill()
      }
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}