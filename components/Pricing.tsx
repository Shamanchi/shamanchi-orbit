'use client'

import { motion } from 'framer-motion'
import { Zap, Rocket, Wrench, Check, ArrowRight } from 'lucide-react'
import { reachGoal } from '@/components/Analytics'

const plans = [
  {
    icon: Zap,
    name: 'Быстрый старт',
    price: 'от 8 000 ₽',
    time: '1-2 дня',
    desc: 'Типовая задача: парсер одного сайта, простой бот, интеграция 2 сервисов, скрипт автоматизации.',
    features: ['Один источник / одна интеграция', 'Базовая обработка ошибок', 'README + краткая документация', '1 раунд правок'],
    popular: false,
  },
  {
    icon: Rocket,
    name: 'Под ключ',
    price: 'от 25 000 ₽',
    time: '3-7 дней',
    desc: 'Сложный проект: мультипарсер, бот с админкой, интеграция 3+ сервисов, система с БД и деплоем.',
    features: ['Множественные источники / интеграции', 'Полная обработка ошибок + fallback', 'AGENT.md + README + отчёты', 'Docker + CI/CD настройка', '3 раунда правок', '30 дней поддержки'],
    popular: true,
  },
  {
    icon: Wrench,
    name: 'Поддержка',
    price: 'от 5 000 ₽/мес',
    time: 'По запросу',
    desc: 'Доработка чужого кода, мониторинг, исправление багов, добавление фич, консультации.',
    features: ['Доработка существующего проекта', 'Мониторинг и алерты', 'Приоритетная поддержка', 'Ежемесячный отчёт'],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-green/10 border border-orbit-green/20 text-orbit-green text-xs font-mono mb-4">
            <Zap size={12} />
            Инвестиция, а не расход
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Сколько стоит <span className="gradient-text">остановить утечку</span> времени?
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            Сложные проекты — обсуждаем индивидуально. Таймкиллеры отсеяны автоматически.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`orbit-card rounded-xl p-6 flex flex-col relative ${plan.popular ? 'border-orbit-cyan/40 shadow-lg shadow-orbit-cyan/5' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orbit-cyan text-orbit-bg text-xs font-bold rounded-full">Рекомендую</div>
              )}
              <div className="w-12 h-12 rounded-lg bg-orbit-cyan/10 flex items-center justify-center mb-4">
                <plan.icon className="text-orbit-cyan" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold gradient-text">{plan.price}</span>
                <span className="text-xs text-orbit-muted">{plan.time}</span>
              </div>
              <p className="text-orbit-muted text-sm mb-6">{plan.desc}</p>
              <div className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-orbit-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <a href="https://t.me/PavelYrevichh" target="_blank" rel="noopener noreferrer"
                 onClick={() => reachGoal('pricing_click')}
                 className={`group w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                   plan.popular ? 'bg-orbit-cyan text-orbit-bg hover:bg-cyan-400' : 'border border-orbit-border text-white hover:border-orbit-cyan/50 hover:bg-orbit-cyan/5'
                 }`}>
                Обсудить проект
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <p className="text-orbit-muted text-sm">
            Не уверены, какой тариф подходит?{' '}
            <a href="https://t.me/PavelYrevichh" target="_blank" rel="noopener noreferrer"
               onClick={() => reachGoal('telegram_click')}
               className="text-orbit-cyan hover:underline">Напишите — сделаю бесплатный аудит</a> и подскажу.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
