'use client'

import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'

const features = [
  { name: 'Прямой контакт с разработчиком', freelancer: true, studio: false, orbit: true },
  { name: 'Фиксированные сроки и цены', freelancer: false, studio: true, orbit: true },
  { name: 'AGENT.md + README + документация', freelancer: false, studio: false, orbit: true },
  { name: 'Обработка ошибок + fallback', freelancer: false, studio: true, orbit: true },
  { name: 'Мониторинг и алерты', freelancer: false, studio: true, orbit: true },
  { name: '30 дней поддержки включено', freelancer: false, studio: false, orbit: true },
  { name: 'Бесплатный аудит перед стартом', freelancer: false, studio: false, orbit: true },
  { name: 'Цена от 8 000 ₽', freelancer: true, studio: false, orbit: true },
  { name: 'Договор и НДС', freelancer: false, studio: true, orbit: false },
  { name: 'Менеджер-посредник', freelancer: false, studio: true, orbit: false },
]

export default function ComparisonTable() {
  return (
    <section className="py-24 relative bg-orbit-card/30 border-y border-orbit-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-cyan/10 border border-orbit-cyan/20 text-orbit-cyan text-xs font-mono mb-4">
            <Check size={12} />
            Сравнение
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Не выбираете <span className="gradient-text">меня</span> — выбираете формат
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            Клиент не выбирает исполнителя. Он сравнивает. Вот честное сравнение.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-orbit-border">
                <th className="text-left py-4 px-4 text-orbit-muted font-normal">Критерий</th>
                <th className="text-center py-4 px-4 text-orbit-muted font-normal">Фрилансер</th>
                <th className="text-center py-4 px-4 text-orbit-muted font-normal">Студия</th>
                <th className="text-center py-4 px-4 text-orbit-cyan font-semibold bg-orbit-cyan/5 rounded-t-lg">
                  Shamanchi Orbit
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className="border-b border-orbit-border/50">
                  <td className="py-3 px-4 text-white">{f.name}</td>
                  <td className="text-center py-3 px-4">
                    {f.freelancer ? <Check size={16} className="text-orbit-green mx-auto" /> : <X size={16} className="text-red-400 mx-auto" />}
                  </td>
                  <td className="text-center py-3 px-4">
                    {f.studio ? <Check size={16} className="text-orbit-green mx-auto" /> : <X size={16} className="text-red-400 mx-auto" />}
                  </td>
                  <td className="text-center py-3 px-4 bg-orbit-cyan/5">
                    {f.orbit ? <Check size={16} className="text-orbit-green mx-auto" /> : <Minus size={16} className="text-orbit-muted mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-orbit-muted text-xs mt-6">
          Мы не заменяем студию для enterprise. Мы — выбор для бизнеса, которому нужен результат без бюрократии.
        </p>
      </div>
    </section>
  )
}
