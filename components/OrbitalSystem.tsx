'use client'

import { useEffect, useRef } from 'react'

interface Planet {
  angle: number
  speed: number
  radius: number
  size: number
  color: string
  label: string
}

export default function OrbitalSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Центральная «звезда» = Shamanchi Orbit
    const sun = { x: centerX, y: centerY, radius: 8, color: '#22d3ee' }

    // Планеты = направления работы
    const planets: Planet[] = [
      { angle: 0, speed: 0.003, radius: 120, size: 5, color: '#06b6d4', label: 'Боты' },
      { angle: 1.5, speed: 0.002, radius: 180, size: 4, color: '#10b981', label: 'Интеграции' },
      { angle: 3.0, speed: 0.0025, radius: 240, size: 6, color: '#22d3ee', label: 'AI' },
      { angle: 4.5, speed: 0.0018, radius: 300, size: 4, color: '#10b981', label: 'Автоматизация' },
    ]

    // Спутники = проекты
    const satellites = planets.map((p, i) => ({
      parentIndex: i,
      angle: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.004,
      radius: 20 + Math.random() * 15,
      size: 2,
      color: 'rgba(6, 182, 212, 0.6)',
    }))

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Рисуем орбиты
      planets.forEach((p) => {
        ctx.beginPath()
        ctx.arc(sun.x, sun.y, p.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 + Math.sin(Date.now() * 0.001 + p.angle) * 0.04})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Рисуем связи между планетами (гравитационные линии)
      for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
          const p1 = planets[i]
          const p2 = planets[j]
          const x1 = sun.x + Math.cos(p1.angle) * p1.radius
          const y1 = sun.y + Math.sin(p1.angle) * p1.radius
          const x2 = sun.x + Math.cos(p2.angle) * p2.radius
          const y2 = sun.y + Math.sin(p2.angle) * p2.radius
          const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
          if (dist < 250) {
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - dist / 250)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Рисуем центральную звезду
      ctx.beginPath()
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2)
      ctx.fillStyle = sun.color
      ctx.shadowColor = sun.color
      ctx.shadowBlur = 20
      ctx.fill()
      ctx.shadowBlur = 0

      // Рисуем планеты
      planets.forEach((p) => {
        p.angle += p.speed
        const x = sun.x + Math.cos(p.angle) * p.radius
        const y = sun.y + Math.sin(p.angle) * p.radius

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Подпись
        ctx.font = '10px ui-monospace, monospace'
        ctx.fillStyle = 'rgba(107, 114, 128, 0.6)'
        ctx.textAlign = 'center'
        ctx.fillText(p.label, x, y + p.size + 12)
      })

      // Рисуем спутники
      satellites.forEach((s) => {
        const parent = planets[s.parentIndex]
        const px = sun.x + Math.cos(parent.angle) * parent.radius
        const py = sun.y + Math.sin(parent.angle) * parent.radius
        s.angle += s.speed
        const x = px + Math.cos(s.angle) * s.radius
        const y = py + Math.sin(s.angle) * s.radius

        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  )
}
