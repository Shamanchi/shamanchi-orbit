import { monoDigits } from '@/components/Text'
import Reveal from '@/components/Reveal'

const featured = {
  text: 'Первая орбита окупила аудит за 9 дней. Дальше — система работала без меня.',
  from: 'оптовая торговля · первая орбита',
}

const reviews = [
  {
    text: 'Ручной ввод заказов ушёл. Менеджер вернул себе 6 часов в неделю — теперь они в продажах, а не в Excel.',
    from: 'интернет-магазин · орбита заявок',
  },
  {
    text: 'Склад перестал звонить офису. Остатки сами едут в 1С — расхождение видно за минуту, а не после инвентаризации.',
    from: 'производство · складская орбита',
  },
  {
    text: 'Бот закрывает 70% вопросов. Остальные приходят мне с полным контекстом — отвечаю за две минуты, не выясняя, чего хотел клиент.',
    from: 'онлайн-школа · AI-ассистент поддержки',
  },
  {
    text: 'Отчёт для руководства собирался полдня. Теперь открываю таблицу — он уже там.',
    from: 'логистика · отчётная орбита',
  },
]

export default function Proof() {
  return (
    <section id="proof" className="relative py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <figure className="glass-card rounded-lg p-8 sm:p-10">
            <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[28px]">
              {monoDigits(featured.text)}
            </blockquote>
            <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
              {featured.from}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {reviews.map((review, index) => (
            <Reveal key={review.from} delay={0.06 * (index + 1)}>
              <figure className="glass-card flex h-full flex-col justify-between rounded-md p-6">
                <blockquote className="text-[15px] leading-relaxed text-ink">
                  {monoDigits(review.text)}
                </blockquote>
                <figcaption className="mt-5 border-t border-white/[0.06] pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                  {review.from}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}