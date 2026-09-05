import OrbitMark from '@/components/OrbitMark'
import TelegramIcon from '@/components/TelegramIcon'
import { Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-14">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <OrbitMark />
          <span className="font-display text-base font-semibold tracking-tight text-ink">
            Shamanchi Orbit
          </span>
        </div>
        <div className="flex flex-col gap-2.5 font-mono text-xs text-ink-dim">
          <a
            href="https://t.me/shamanchi_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-ink"
          >
            <TelegramIcon size={14} />
            @shamanchi_dev
          </a>
          <a href="mailto:shamanchi_dev@mail.ru" className="flex items-center gap-2 transition-colors hover:text-ink">
            <Mail size={14} strokeWidth={1.75} />
            shamanchi_dev@mail.ru
          </a>
          <a
            href="https://github.com/Shamanchi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-ink"
          >
            <Github size={14} strokeWidth={1.75} />
            github.com/Shamanchi
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 w-full max-w-[1200px] px-6 font-mono text-[11px] text-ink-dim/70">
        © <span className="font-mono">2026</span> Shamanchi Orbit — скрытые орбиты бизнес-процессов
      </div>
    </footer>
  )
}