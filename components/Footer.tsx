import OrbitMark from '@/components/OrbitMark'

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
            href="https://t.me/PavelYrevichh"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            @PavelYrevichh
          </a>
          <a href="mailto:lietman46@mail.com" className="transition-colors hover:text-ink">
            lietman46@mail.com
          </a>
          <a
            href="https://github.com/Shamanchi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
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