import { monoDigits } from '@/components/Text'
import Reveal from '@/components/Reveal'
import Magnetic from '@/components/Magnetic'

const plans = [
  {
    name: 'Аудит',
    price: '0 ₽',
    note: '30 минут',
    desc: 'Сканирование одной орбиты: карта процессов, точка рычага, разрывы между системами.',
    features: [
      'Карта процессов за 30 минут',
      'Точка рычага: где 20% усилий дают 80% результата',
      'Список разрывов между системами',
      'План первой орбиты',
    ],
    recommended: false,
  },
  {
    name: 'Орбита',
    price: 'от 25 000 ₽',
    note: '3–7 дней',
    desc: 'Одна восстановленная орбита: от архитектуры до документации. Код, тесты, деплой.',
    features: [
      'Архитектура и проектирование потока',
      'Код, тесты, деплой',
      'Документация для вашего будущего себя',
      '30 дней поддержки',
      'Резервный путь для ключевого потока',
    ],
    recommended: true,
  },
  {
    name: 'Гравитация',
    price: 'от 90 000 ₽',
    note: 'от 3 недель',
    desc: 'Система из нескольких орбит. Рост без новых узких мест, архитектура под 10x.',
    features: [
      'Несколько потоков в одной системе',
      'Архитектура под рост 10x',
      'Резервные орбиты для критичных данных',
      'Передача знаний вашей стороне',
    ],
    recommended: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal className="mb-20 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              07 · тарифы
            </span>
          </div>
          <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Три формата. Цена после аудита, не до
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-dim">
            Без залипания на недели. Сначала находим точку рычага, потом называем цифру.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`glass-card flex flex-col rounded-md p-9 ${
                plan.recommended ? 'orbit-halo lg:-mt-6 lg:mb-6' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {plan.name}
                </h3>
                {plan.recommended && (
                  <span className="shrink-0 pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                    основная орбита
                  </span>
                )}
              </div>
              <div className="mt-8 font-mono text-3xl text-ink">{plan.price}</div>
              <div className="mt-2 font-mono text-xs text-ink-dim">{plan.note}</div>
              <p className="mt-6 text-sm leading-relaxed text-ink-dim">{monoDigits(plan.desc)}</p>
              <ul className="mt-8 flex-1 space-y-3.5 border-t border-white/[0.06] pt-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-ink-dim">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full border border-ink-dim/70" />
                    {monoDigits(feature)}
                  </li>
                ))}
              </ul>
              <Magnetic className="mt-10">
                <a
                  href="#audit"
                  className={`block w-full px-6 py-3 text-center text-sm ${
                    plan.recommended ? 'btn-audit' : 'btn-ghost text-ink-dim hover:text-ink'
                  }`}
                >
                  Обсудить
                </a>
              </Magnetic>
            </article>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs text-ink-dim">
          // точная цена — после аудита
        </p>
      </div>
    </section>
  )
}