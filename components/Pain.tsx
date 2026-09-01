'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Database, TrendingDown } from 'lucide-react'

const pains = [
  {
    icon: Clock,
    title: 'Ручной перенос данных между сервисами',
    desc: 'Вы тратите 4 часа в день на копирование из Excel в 1С, из 1С в Telegram, из Telegram в Google Sheets. Через 2 недели это 200-часовой долг.',
    stat: '4 ч/день',
  },
  {
    icon: Database,
    title: 'Данные разбросаны по 5 разным системам',
    desc: 'CRM, Excel, Telegram, email, 1С — каждый живёт своей жизнью. Нет единой картины. Решения принимаются вслепую.',
    stat: '5 систем',
  },
  {
    icon: TrendingDown,
    title: 'Подрядчик исчез после оплаты',
    desc: 'Бот, который «сделал студент за 3K», сломался. Автор не отвечает. Теперь вы боитесь доверять новому исполнителю.',
    stat: '3K → 0',
  },
]

export default function Pain() {
  return (
    <section id="pain" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono mb-4">
            <AlertTriangle size={12} />
            Признаки, что пора остановиться
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Вы до сих пор{' '}
            <span className="text-red-400">теряете деньги</span> на ручной
            работе?
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            Если узнали себя хотя бы в одном пункте — это сигнал, что система
            трещит по швам.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="orbit-card rounded-xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="text-3xl font-bold text-red-500/10 group-hover:text-red-500/20 transition-colors font-mono">
                  {item.stat}
                </span>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <item.icon className="text-red-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-orbit-muted text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
