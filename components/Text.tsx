import type { ReactNode } from 'react'

export function monoDigits(text: string, keyPrefix = ''): ReactNode[] {
  return text.split(/(\d+)/).map((part, i) =>
    /^\d+$/.test(part) ? (
      <span key={`${keyPrefix}m${i}`} className="font-mono">
        {part}
      </span>
    ) : (
      <span key={`${keyPrefix}t${i}`}>{part}</span>
    )
  )
}