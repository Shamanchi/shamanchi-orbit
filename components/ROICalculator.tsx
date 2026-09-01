'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight } from 'lucide-react'
import { reachGoal } from '@/components/Analytics'

export default function ROICalculator() {
  const [hoursPerDay, setHoursPerDay] = useState(2)
  const [hourlyRate, setHourlyRate] = useState(500)
  const [employees, setEmployees] = useState(1)

  const monthlyLoss = hoursPerDay * hourlyRate * 22 * employees
  const yearlyLoss = monthlyLoss * 12
  const savings = Math.round(yearlyLoss * 0.7)

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="orbit-card rounded-2xl p-8 border-orbit-cyan/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-orbit-cyan/10 flex items-center justify-center">
              <Calculator className="text-orbit-cyan" size={20} />
            </div>
            <h2 className="text-2xl font-bold">
              Калькулятор <span className="gradient-text">убытков</span>
            </h2>
          </div>
          <p className="text-orbit-muted mb-8">
            Введите данные — увидите, сколько вы теряете на ручной работе каждый год.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm text-orbit-muted mb-2">Часов в день на ручную работу</label>
              <input type="range" min="0.5" max="8" step="0.5" value={hoursPerDay} onChange={(e) => setHoursPerDay(parseFloat(e.target.value))} className="w-full accent-orbit-cyan" />
              <div className="text-center text-orbit-cyan font-mono mt-1">{hoursPerDay} ч</div>
            </div>
            <div>
              <label className="block text-sm text-orbit-muted mb-2">Стоимость часа (₽)</label>
              <input type="range" min="200" max="5000" step="100" value={hourlyRate} onChange={(e) => setHourlyRate(parseInt(e.target.value))} className="w-full accent-orbit-cyan" />
              <div className="text-center text-orbit-cyan font-mono mt-1">{hourlyRate.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div>
              <label className="block text-sm text-orbit-muted mb-2">Сотрудников</label>
              <input type="range" min="1" max="20" step="1" value={employees} onChange={(e) => setEmployees(parseInt(e.target.value))} className="w-full accent-orbit-cyan" />
              <div className="text-center text-orbit-cyan font-mono mt-1">{employees} чел</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-orbit-bg border border-orbit-border">
              <div className="text-sm text-orbit-muted mb-1">Потери в месяц</div>
              <div className="text-xl font-bold text-red-400 font-mono">{monthlyLoss.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="p-4 rounded-xl bg-orbit-bg border border-orbit-border">
              <div className="text-sm text-orbit-muted mb-1">Потери в год</div>
              <div className="text-xl font-bold text-red-400 font-mono">{yearlyLoss.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="p-4 rounded-xl bg-orbit-green/5 border border-orbit-green/20">
              <div className="text-sm text-orbit-muted mb-1">Экономия после автоматизации</div>
              <div className="text-xl font-bold text-orbit-green font-mono">{savings.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="https://t.me/PavelYrevichh" target="_blank" rel="noopener noreferrer"
               onClick={() => reachGoal('telegram_click')}
               className="inline-flex items-center gap-2 text-orbit-cyan hover:text-cyan-400 transition-colors">
              Обсудить, как остановить эту утечку <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
