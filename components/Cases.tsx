'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react'

const caseStudies = [
  {
    client: 'СТО «АвтоПрофи»',
    problem: 'Менеджер тратил 3 часа в день на ручное составление отчётов из 5 Excel-таблиц. Ошибки в данных приводили к переплатам поставщикам.',
    solution: 'Автоматическая система сбора данных из 1С, Telegram-бот для заявок, дашборд в Google Sheets.',
    metrics: [
      { icon: Clock, value: '-15 ч/нед', label: 'Экономия времени' },
      { icon: DollarSign, value: '-120K ₽/мес', label: 'Переплаты устранены' },
      { icon: TrendingUp, value: '340%', label: 'ROI за 2 месяца' },
    ],
    tags: ['1С', 'Telegram-бот', 'Google Sheets', 'n8n'],
  },
  {
    client: 'Логистическая компания',
    problem: 'Данные о грузах разбросаны по amoCRM, Excel и Telegram. Менеджеры дублировали информацию, клиенты получали неверные статусы.',
    solution: 'Единая система интеграции: amoCRM ↔ 1С ↔ Telegram-бот. Авто-уведомления клиентам, единая база статусов.',
    metrics: [
      { icon: Clock, value: '-8 ч/день', label: 'Экономия времени' },
      { icon: TrendingUp, value: '0%', label: 'Ошибок в статусах' },
      { icon: DollarSign, value: '+25%', label: 'Удержание клиентов' },
    ],
    tags: ['amoCRM', '1С', 'Telegram-бот', 'API'],
  },
  {
    client: 'Онлайн-школа',
    problem: 'Ручная рассылка материалов 200+ ученикам. 2 сотрудника занимались только email-рассылками. Пропуски, задержки, недовольные клиенты.',
    solution: 'Telegram-бот с FSM: регистрация, авто-рассылка материалов, напоминания, оплата, админ-панель.',
    metrics: [
      { icon: Clock, value: '-40 ч/нед', label: 'Экономия времени' },
      { icon: TrendingUp, value: '92%', label: 'Доставка материалов' },
      { icon: DollarSign, value: '2 сотр.', label: 'Освобождено' },
    ],
    tags: ['aiogram 3.x', 'FSM', 'PostgreSQL', 'Docker'],
  },
]

export default function Cases() {
  return (
    <section id="cases" className="py-24 relative bg-orbit-card/30 border-y border-orbit-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-green/10 border border-orbit-green/20 text-orbit-green text-xs font-mono mb-4">
            <TrendingUp size={12} />
            Результаты клиентов
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Не обещаем — <span className="gradient-text">доказываем</span> цифрами
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            Каждый кейс — реальный проект с измеримым результатом. До/после в часах и рублях.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="orbit-card rounded-xl p-6 md:p-8"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-orbit-cyan px-2 py-0.5 rounded bg-orbit-cyan/10">
                      Кейс {i + 1}
                    </span>
                    <span className="text-sm text-orbit-muted">{item.client}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Проблема</h3>
                  <p className="text-orbit-muted text-sm mb-4">{item.problem}</p>
                  <h3 className="text-lg font-semibold text-white mb-2">Решение</h3>
                  <p className="text-orbit-muted text-sm mb-4">{item.solution}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-orbit-bg text-orbit-muted border border-orbit-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {item.metrics.map((metric, j) => (
                    <div key={j} className="p-4 rounded-xl bg-orbit-bg border border-orbit-border text-center">
                      <metric.icon className="text-orbit-cyan mx-auto mb-2" size={20} />
                      <div className="text-2xl font-bold gradient-text font-mono">{metric.value}</div>
                      <div className="text-xs text-orbit-muted">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
