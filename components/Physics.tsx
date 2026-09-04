import { monoDigits } from '@/components/Text'

const patterns = [
  {
    num: '01',
    title: 'Скрытые орбиты',
    text: '1С не говорит с CRM. CRM не говорит с Telegram. Мы не «создаём интеграции» — восстанавливаем естественный поток данных между системами.',
  },
  {
    num: '02',
    title: 'Точка рычага',
    text: 'В 90% бизнесов есть одно место, где 20% усилий дают 80% результата. Находим его за 30 минут аудита.',
  },
  {
    num: '03',
    title: 'Петля обратной связи',
    text: 'Автоматизация → освобождение внимания → рост → новые узкие места → следующая орбита. Система, которая не застывает.',
  },
]

export default function Physics() {
  return (
    <section id="physics" className="relative py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              01 · физика orbit
            </span>
          </div>
          <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Три паттерна, по которым устроен любой бизнес
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {patterns.map((pattern, i) => (
            <article
              key={pattern.num}
              className={`card-ghost relative p-8 sm:p-9 ${
                i === 1 ? 'lg:mt-20' : i === 2 ? 'lg:mt-10' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="mark" />
                <span className="font-mono text-sm text-ink-dim">{pattern.num}</span>
              </div>
              <h3 className="mt-10 font-display text-[22px] font-semibold tracking-tight text-ink">
                {pattern.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">
                {monoDigits(pattern.text)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}