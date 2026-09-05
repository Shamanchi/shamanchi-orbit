import { monoDigits } from '@/components/Text'
import Reveal from '@/components/Reveal'

const forbidden = [
  {
    num: '01',
    text: 'Не начинаем с кода. Начинаем с архитектуры процесса. Не готовы потратить 30 минут на аудит — мы не ваш проводник.',
  },
  {
    num: '02',
    text: 'Не документируем для вас. Документируем для вашего будущего себя. Через 6 месяцев система понятна без нас.',
  },
  {
    num: '03',
    text: 'Не строим «на сегодня». Закладываем рост на 10x, чтобы следующий виток не потребовал переписывания.',
  },
]

const fit = [
  'Держите таблицу, которую боитесь удалять: «вдруг что-то сломается»',
  'Поняли, что процесс живёт в голове менеджера, только когда он ушёл в отпуск',
  'Готовы отдать 30 минут на аудит до оценки и кода',
  'Хотите, чтобы система работала, пока вы не смотрите на неё',
]

const notFit = [
  'Ищете «бота за 500 рублей» — здесь таких не делают',
  'Хотите код в понедельник и не готовы говорить о процессе',
  'Считаете документацию лишней тратой времени',
  'Думаете, что автоматизация починит хаос без архитектуры',
]

export default function Principles() {
  return (
    <section id="principles" className="relative py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal className="mb-16 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              06 · принципы
            </span>
          </div>
          <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Три запрета. Без них система не выживет
          </h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {forbidden.map((item) => (
            <article key={item.num} className="glass-card rounded-md p-8 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-ink-dim">{item.num}</span>
                <span className="h-px flex-1 bg-white/[0.08]" />
              </div>
              <p className="mt-8 text-[15px] leading-relaxed text-ink">
                {monoDigits(item.text)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-28 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-ink">+</span>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Кто входит
              </h3>
            </div>
            <ul className="mt-8 space-y-5">
              {fit.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dim/60" />
                  {monoDigits(item)}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-md p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-ink-dim">×</span>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Кто не входит
              </h3>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">
              Такие проекты мы не берём. Это экономит месяцы обеим сторонам.
            </p>
            <ul className="mt-8 space-y-5">
              {notFit.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-dim">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-ink-dim/50" />
                  {monoDigits(item)}
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-white/[0.08] pt-7">
              <a
                href="#audit"
                className="text-[15px] leading-relaxed text-ink-dim transition-colors hover:text-ink"
              >
                Узнали себя? Аудит покажет, есть ли обратный путь
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}