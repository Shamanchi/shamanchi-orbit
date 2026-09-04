import { monoDigits } from '@/components/Text'

const steps = [
  {
    num: '01',
    title: 'Археология',
    text: '30 минут аудита: карта процессов, разрывы между системами, точка рычага. Ни одной строки кода до карты.',
  },
  {
    num: '02',
    title: 'Проектирование',
    text: 'Одна точка рычага — 20% усилий, которые дают 80% результата. Схема орбиты до реализации.',
  },
  {
    num: '03',
    title: 'Орбита',
    text: 'Сборка системы: данные начинают двигаться по восстановленному потоку. Код читаемый, документация рядом.',
  },
  {
    num: '04',
    title: 'Документация',
    text: 'Система понятна через 6 месяцев без нас. Документируем для вашего будущего себя.',
  },
  {
    num: '05',
    title: 'Рост',
    text: 'Освобождённое внимание возвращается в бизнес. Архитектура рассчитана на рост до 10x без новых узких мест.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              03 · процесс
            </span>
          </div>
          <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Пять шагов. От карты процесса до запущенной орбиты
          </h2>
        </div>

        <div>
          {steps.map((step, i) => (
            <div
              key={step.num}
              id={`process-step-${i + 1}`}
              className="grid grid-cols-12 items-baseline gap-x-6 border-b border-white/[0.06] py-9 first:border-t"
            >
              <div className="col-span-2 font-mono text-base text-ink-dim md:col-span-1">
                {step.num}
              </div>
              <h3 className="col-span-10 font-display text-2xl font-semibold tracking-tight text-ink md:col-span-4">
                {step.title}
              </h3>
              <p className="col-span-12 mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim md:col-span-5 md:col-start-8 md:mt-0">
                {monoDigits(step.text)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}