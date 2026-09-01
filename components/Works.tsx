'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Bot, Workflow, Globe, FileSpreadsheet, Server, Brain } from 'lucide-react'
import { reachGoal } from '@/components/Analytics'

const projects = [
  { icon: Bot, title: 'Telegram-бот с FSM', desc: 'Асинхронный бот: заявки, рассылки, CRM, оплата, админ-панель. aiogram 3.x, middleware, .env-конфиг.', tags: ['Python', 'aiogram 3.x', 'FSM'], demo: 'https://t.me/PavelYrevichh', code: 'https://github.com/Shamanchi/telegram-bot-aiogram' },
  { icon: Workflow, title: 'Система интеграций', desc: 'Связка 1С, Битрикс24, amoCRM, Google Sheets, Telegram. Единый поток данных между 5+ сервисами.', tags: ['Python', 'Pydantic', 'REST', 'n8n'], demo: null, code: 'https://github.com/Shamanchi/python-api-integrator' },
  { icon: Globe, title: 'API-интегратор', desc: 'REST API клиент с retry, backoff, валидацией. Надёжная связь любых сервисов: от 1С до облачных CRM.', tags: ['Python', 'Pydantic', 'REST'], demo: null, code: 'https://github.com/Shamanchi/python-api-integrator' },
  { icon: FileSpreadsheet, title: 'Отчётность и аналитика', desc: 'Pandas, openpyxl, Excel с макросами, PDF, дашборды. Не сырые данные — а решения для бизнеса.', tags: ['Pandas', 'openpyxl', 'PDF'], demo: null, code: 'https://github.com/Shamanchi' },
  { icon: Server, title: 'FastAPI + PostgreSQL', desc: 'REST API на FastAPI + SQLAlchemy + PostgreSQL + Docker. Чистая архитектура, готовая к нагрузке.', tags: ['FastAPI', 'PostgreSQL', 'Docker'], demo: null, code: 'https://github.com/Shamanchi/fastapi-task-manager' },
  { icon: Brain, title: 'AI-ассистент', desc: 'OpenAI API, function calling, AI-агенты. Интеграция ИИ в бизнес-процессы: ответы, анализ, генерация.', tags: ['OpenAI', 'Function Calling', 'AI Agents'], demo: null, code: 'https://github.com/Shamanchi/ai-openai-assistant' },
]

export default function Works() {
  return (
    <section id="works" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-green/10 border border-orbit-green/20 text-orbit-green text-xs font-mono mb-4">
            <Github size={12} />
            Репозитории
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Код, который <span className="gradient-text">работает</span> под нагрузкой
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            Не скриншоты. Живые репозитории с README, документацией и production-ready кодом.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="orbit-card rounded-xl p-6 flex flex-col group">
              <div className="w-12 h-12 rounded-lg bg-orbit-cyan/10 flex items-center justify-center mb-4">
                <project.icon className="text-orbit-cyan" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-orbit-cyan transition-colors">{project.title}</h3>
              <p className="text-orbit-muted text-sm mb-4 flex-1">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-orbit-bg text-orbit-muted border border-orbit-border">{tag}</span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                     onClick={() => reachGoal('works_click')}
                     className="inline-flex items-center gap-1 text-sm text-orbit-cyan hover:text-cyan-400 transition-colors">
                    <ExternalLink size={14} /> Демо
                  </a>
                )}
                <a href={project.code} target="_blank" rel="noopener noreferrer"
                   onClick={() => reachGoal('github_click')}
                   className="inline-flex items-center gap-1 text-sm text-orbit-muted hover:text-white transition-colors">
                  <Github size={14} /> Код
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
