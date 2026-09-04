'use client'

import { useEffect, useState } from 'react'

type Status = 'online' | 'offline' | 'unknown'

export default function ReplyStatus() {
  const [status, setStatus] = useState<Status>('unknown')

  useEffect(() => {
    const compute = () => {
      try {
        const parts = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Moscow',
          weekday: 'short',
          hour: 'numeric',
          hour12: false,
        }).formatToParts(new Date())
        const weekday = (parts.find((p) => p.type === 'weekday')?.value ?? '').toLowerCase()
        const hour = Number(parts.find((p) => p.type === 'hour')?.value)
        const weekend = weekday === 'sat' || weekday === 'sun'
        setStatus(!weekend && hour >= 9 && hour < 19 ? 'online' : 'offline')
      } catch {
        setStatus('unknown')
      }
    }
    compute()
    const timer = window.setInterval(compute, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const label =
    status === 'online'
      ? 'в сети · ответ в telegram — ~15 мин'
      : status === 'offline'
        ? 'вне сети · ответ — в течение дня'
        : 'ответ — в течение дня'

  return (
    <p className="flex items-center gap-2.5 font-mono text-xs text-ink-dim">
      <span
        className={
          status === 'online'
            ? 'h-1.5 w-1.5 rounded-full bg-chi'
            : 'h-1.5 w-1.5 rounded-full bg-ink-dim/40'
        }
      />
      <span>{label}</span>
    </p>
  )
}