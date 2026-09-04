import { monoDigits } from '@/components/Text'

export default function Proof() {
  return (
    <section id="proof" className="relative py-12">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <figure className="max-w-3xl border-l border-white/[0.12] pl-8 sm:pl-12">
          <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[28px]">
            {monoDigits('Первая орбита окупила аудит за 9 дней. Дальше — система работала без меня.')}
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
            оптовая торговля · первая орбита
          </figcaption>
        </figure>
      </div>
    </section>
  )
}