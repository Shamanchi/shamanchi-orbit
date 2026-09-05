import SpaceBackdrop from '@/components/SpaceBackdrop'
import TypedTerminal from '@/components/TypedTerminal'
import HeroHeading from '@/components/HeroHeading'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pb-20 pt-32 lg:pt-36"
    >
      <SpaceBackdrop />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-12 gap-x-6 px-6">
        <div className="col-span-12 pt-4 lg:col-span-8 xl:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink-dim">
            [ scan ] скрытые орбиты бизнеса
          </p>
          <HeroHeading />
          <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-dim">
            Мы находим скрытые орбиты и запускаем их. Ручной труд — симптом
            разрыва между системами. Сначала археология, потом автоматизация.
            Аудит — <span className="font-mono text-ink">30</span> минут против
            месяцев ручной работы.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <a href="#audit" className="btn-audit rounded px-8 py-3.5 text-[15px] font-medium">
              Пройти аудит
            </a>
            <a
              href="#physics"
              className="btn-phantom rounded px-8 py-3.5 text-[15px] text-ink-dim hover:text-ink"
            >
              Физика Orbit
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 w-full max-w-[1200px] px-6">
        <TypedTerminal />
      </div>

    </section>
  )
}
