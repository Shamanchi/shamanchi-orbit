'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const reviews = [
  {
    text: 'До Павла у нас был «бот, который работал иногда». После — система с админкой, логами и документацией. Впервые вижу разработчика, который думает о том, что будет через 6 месяцев.',
    author: 'Руководитель отдела логистики',
    company: 'Транспортная компания (Москва)',
    rating: 5,
  },
  {
    text: 'Сэкономили 15 часов в неделю на отчётах. Самое ценное — не скрипт, а AGENT.md, который позволил нашему junior-разработчику поддерживать систему самостоятельно.',
    author: 'Операционный директор',
    company: 'СТО «АвтоПрофи» (СПб)',
    rating: 5,
  },
  {
    text: 'Ответил за 10 минут, провёл аудит за 30 минут, запустил бота за 2 дня. При этом предупредил о рисках, которых мы не видели. Это не разработчик — это архитектор.',
    author: 'Основатель онлайн-школы',
    company: 'EdTech-проект (удалённо)',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-cyan/10 border border-orbit-cyan/20 text-orbit-cyan text-xs font-mono mb-4">
            <Star size={12} />
            Что говорят клиенты
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Доверие <span className="gradient-text">проверено</span> делом
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            Не «портфолио для красоты». А реальные слова людей, которые платили и получили результат.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="orbit-card rounded-xl p-6 relative"
            >
              <Quote className="text-orbit-cyan/20 absolute top-4 right-4" size={32} />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="text-orbit-green fill-orbit-green" size={14} />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{review.text}</p>
              <div className="border-t border-orbit-border pt-4">
                <div className="font-semibold text-white text-sm">{review.author}</div>
                <div className="text-orbit-muted text-xs">{review.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
