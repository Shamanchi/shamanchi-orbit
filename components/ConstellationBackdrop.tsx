'use client'

import { useEffect, useRef, useState } from 'react'

const COLOR_BASE = '#8B98A9'
const COLOR_ACCENT = '#00D4FF'
const LINE_RGB = '0, 212, 255'
const ACCENT_RATIO = 0.1
const LINK_SCALE = 0.2
const LINK_MIN_PX = 90
const LINK_MAX_PX = 240
const SEED_GAP_SCALE = 0.05
const MAX_DRIFT_PX = 5
const SMALL_AREA_PX = 520
const POINT_COUNT_DESKTOP = 52
const POINT_COUNT_MOBILE = 44
const WRAP_MARGIN = 0.06
const MOBILE_WIDTH_PX = 768

type Point = {
  x: number
  y: number
  vx: number
  vy: number
  accent: boolean
  phase: number
}

type Frame = {
  points: Point[]
  width: number
  height: number
  link: number
}

function seedPoints(width: number, height: number): Point[] {
  const count =
    Math.min(width, height) < SMALL_AREA_PX ? POINT_COUNT_MOBILE : POINT_COUNT_DESKTOP
  const gap = Math.min(width, height) * SEED_GAP_SCALE
  const accentCount = Math.max(1, Math.round(count * ACCENT_RATIO))
  const points: Point[] = []
  let attempts = 0

  while (points.length < count && attempts < count * 250) {
    attempts += 1
    const x = WRAP_MARGIN + Math.random() * (1 - WRAP_MARGIN * 2)
    const y = WRAP_MARGIN + Math.random() * (1 - WRAP_MARGIN * 2)
    let tooClose = false

    for (const existing of points) {
      const dx = (existing.x - x) * width
      const dy = (existing.y - y) * height
      if (Math.hypot(dx, dy) < gap) {
        tooClose = true
        break
      }
    }

    if (tooClose) continue

    const angle = Math.random() * Math.PI * 2
    const speed = 0.4 + Math.random() * MAX_DRIFT_PX
    points.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      accent: points.length < accentCount,
      phase: Math.random() * Math.PI * 2,
    })
  }

  return points
}

/**
 * Site-wide fixed constellation: dots and faint links painted on a
 * full-viewport canvas behind the content. Same visual config as the old
 * hero constellation. Off on coarse pointers / small viewports and under
 * prefers-reduced-motion.
 */
export default function ConstellationBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setEnabled(!reduced && !coarse && window.innerWidth >= MOBILE_WIDTH_PX)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let frame: Frame | null = null
    let animationFrame = 0
    let lastTime = 0

    const linkDistance = (width: number, height: number) => {
      const bySize = Math.min(width, height) * LINK_SCALE
      return Math.min(LINK_MAX_PX, Math.max(LINK_MIN_PX, bySize))
    }

    const render = (now: number) => {
      if (!frame) return
      const { points, width, height, link } = frame

      context.clearRect(0, 0, width, height)
      context.lineWidth = 1

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i]
          const b = points[j]
          const dx = (a.x - b.x) * width
          const dy = (a.y - b.y) * height
          const distance = Math.hypot(dx, dy)

          if (distance >= link || distance < 0.001) continue

          const progress = distance / link
          const alpha = 0.12 - 0.04 * progress
          context.strokeStyle = `rgba(${LINE_RGB}, ${alpha.toFixed(3)})`
          context.beginPath()
          context.moveTo(a.x * width, a.y * height)
          context.lineTo(b.x * width, b.y * height)
          context.stroke()
        }
      }

      for (const point of points) {
        if (!point.accent) continue
        const sx = point.x * width
        const sy = point.y * height
        const pulse = 0.72 + 0.28 * Math.sin(now / 900 + point.phase)
        const halo = context.createRadialGradient(sx, sy, 0, sx, sy, 7)
        halo.addColorStop(0, `rgba(0, 212, 255, ${(0.3 * pulse).toFixed(3)})`)
        halo.addColorStop(1, 'rgba(0, 212, 255, 0)')
        context.fillStyle = halo
        context.beginPath()
        context.arc(sx, sy, 7, 0, Math.PI * 2)
        context.fill()
      }

      for (const point of points) {
        const sx = point.x * width
        const sy = point.y * height
        context.beginPath()
        context.arc(sx, sy, point.accent ? 2.2 : 1.6, 0, Math.PI * 2)
        context.fillStyle = point.accent ? COLOR_ACCENT : COLOR_BASE
        context.globalAlpha = point.accent ? 0.95 : 0.8
        context.fill()
        context.globalAlpha = 1
      }
    }

    const animateFrame = (now: number) => {
      if (!frame) return
      const delta = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      for (const point of frame.points) {
        point.x += (point.vx * delta) / frame.width
        point.y += (point.vy * delta) / frame.height

        if (point.x > 1 + WRAP_MARGIN) point.x = -WRAP_MARGIN
        else if (point.x < -WRAP_MARGIN) point.x = 1 + WRAP_MARGIN

        if (point.y > 1 + WRAP_MARGIN) point.y = -WRAP_MARGIN
        else if (point.y < -WRAP_MARGIN) point.y = 1 + WRAP_MARGIN
      }

      render(now)
      animationFrame = requestAnimationFrame(animateFrame)
    }

    const setup = () => {
      const width = Math.max(1, Math.round(window.innerWidth))
      const height = Math.max(1, Math.round(window.innerHeight))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bufferWidth = Math.round(width * dpr)
      const bufferHeight = Math.round(height * dpr)

      if (canvas.width !== bufferWidth) canvas.width = bufferWidth
      if (canvas.height !== bufferHeight) canvas.height = bufferHeight
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const resizedSignificantly =
        !frame ||
        Math.abs(frame.width - width) / width > 0.4 ||
        Math.abs(frame.height - height) / height > 0.4

      if (resizedSignificantly) {
        frame = {
          points: seedPoints(width, height),
          width,
          height,
          link: linkDistance(width, height),
        }
        lastTime = performance.now()
      } else if (frame) {
        frame.width = width
        frame.height = height
      }

      render(performance.now())
    }

    setup()
    lastTime = performance.now()
    animationFrame = requestAnimationFrame(animateFrame)

    const onResize = () => {
      setup()
      lastTime = performance.now()
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(animateFrame)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
    />
  )
}