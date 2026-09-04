import { monoDigits } from '@/components/Text'
import Reveal from '@/components/Reveal'

const projects = [
  {
    name: 'Орбита заявок: 1С + Telegram',
    stack: 'python · aiogram · api 1с · docker',
    value: '0',
    unit: 'ручных переносов в день',
    repo: 'https://github.com/Shamanchi/telegram-bot-aiogram',
    desc: 'Заявка из 1С уходит в Telegram, ответ менеджера возвращается в 1С без рук.',
  },
  {
    name: 'API-мост: CRM + Google Sheets',
    stack: 'python · fastapi · sheets api',
    value: '26',
    unit: 'часов рутины в месяц возвращено',
    repo: 'https://github.com/Shamanchi/python-api-integrator',
    desc: 'Отчёты собираются из CRM автоматически. Таблица перестала быть кладбищем данных.',
  },
  {
    name: 'AI-ассистент поддержки',
    stack: 'openai · function calling · aiogram',
    value: '70%',
    unit: 'типовых ответов без человека',
    repo: 'https://github.com/Shamanchi/ai-openai-assistant',
    desc: 'Бот отвечает на типовые вопросы, сложные переводит человеку с полным контекстом.',
  },
]

export default function Works() {
  return (
    <section id="works" className="relative py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal className="mb-16 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              04 · работы
            </span>
          </div>
          <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Запущенные орбиты. Без скриншотов и обещаний
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-dim">
            Живые репозитории с кодом, документацией и одним измеримым результатом.
          </p>
        </Reveal>

        <div className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="glass-card grid grid-cols-12 gap-x-6 gap-y-5 rounded-md p-8 sm:p-10"
            >
              <div className="col-span-12 md:col-span-4">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {monoDigits(project.name)}
                </h3>
                <p className="mt-3 font-mono text-xs text-ink-dim">{project.stack}</p>
              </div>
              <p className="col-span-12 max-w-lg text-[15px] leading-relaxed text-ink-dim md:col-span-4 md:col-start-5">
                {monoDigits(project.desc)}
              </p>
              <div className="col-span-12 md:col-span-3 md:col-start-10 md:text-right">
                <div className="font-mono text-4xl text-ink">{project.value}</div>
                <div className="mt-2 font-mono text-xs leading-5 text-ink-dim">{project.unit}</div>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-xs text-ink-dim underline decoration-white/[0.15] underline-offset-4 transition-colors hover:text-ink hover:decoration-[#00D4FF]/60"
                >
                  github.com/Shamanchi/{project.repo.split('/').pop()}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}