'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Github, Send } from 'lucide-react'
import { reachGoal } from '@/components/Analytics'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Процесс', href: '#process' },
    { label: 'Работы', href: '#works' },
    { label: 'Почему я', href: '#whyme' },
    { label: 'Цены', href: '#pricing' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-orbit-bg/90 backdrop-blur-md border-b border-orbit-border' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Shamanchi</span>
            <span className="text-white ml-1">Orbit</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-orbit-muted hover:text-orbit-cyan transition-colors">
                {link.label}
              </a>
            ))}
            <a href="https://github.com/Shamanchi" target="_blank" rel="noopener noreferrer"
               onClick={() => reachGoal('github_click')}
               className="text-orbit-muted hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://t.me/PavelYrevichh" target="_blank" rel="noopener noreferrer"
               onClick={() => reachGoal('telegram_click')}
               className="flex items-center gap-2 px-4 py-2 bg-orbit-cyan/10 border border-orbit-cyan/30 text-orbit-cyan rounded-lg text-sm font-medium hover:bg-orbit-cyan/20 transition-all">
              <Send size={14} />
              Написать
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-orbit-bg/95 backdrop-blur-md border-b border-orbit-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block text-orbit-muted hover:text-orbit-cyan transition-colors"
                 onClick={() => setMobileOpen(false)}>{link.label}</a>
            ))}
            <a href="https://t.me/PavelYrevichh" target="_blank" rel="noopener noreferrer"
               onClick={() => reachGoal('telegram_click')}
               className="flex items-center gap-2 px-4 py-2 bg-orbit-cyan/10 border border-orbit-cyan/30 text-orbit-cyan rounded-lg text-sm font-medium w-fit">
              <Send size={14} />
              Написать в Telegram
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
