'use client'

import { useEffect, useState } from 'react'
import OrbitMark from '@/components/OrbitMark'

const links = [
  { label: 'Физика', href: '#physics' },
  { label: 'Процесс', href: '#process' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/[0.06] bg-[#0B1120]/85 backdrop-blur-sm' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-3" aria-label="Shamanchi Orbit — наверх">
          <OrbitMark />
          <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
            Shamanchi <span className="text-ink-dim">Orbit</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Основная навигация">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-dim transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a href="#audit" className="btn-audit rounded px-5 py-2 text-sm">
            Аудит
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded border border-white/[0.08] text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#0B1120]/95 backdrop-blur-sm md:hidden">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-sm text-ink-dim hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a href="#audit" onClick={() => setOpen(false)} className="btn-audit mt-2 rounded px-5 py-2.5 text-center text-sm">
              Аудит
            </a>
          </div>
        </div>
      )}
    </header>
  )
}