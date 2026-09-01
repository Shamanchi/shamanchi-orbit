'use client'

import { motion } from 'framer-motion'
import { Target, BarChart3, Shield, Brain } from 'lucide-react'

const experts = [
  {
    icon: Target,
    role: 'Стратег',
    name: 'Предприниматель-миллиардер',
    principle: 'Фильтр, а не воронка',
    insight: 'Хороший сайт отпугивает неправильных клиентов сильнее, чем привлекает правильных. Мы не берём всё подряд — берём только то, где создаём асимметричное преимущество.',
    color: 'cyan',
  },
  {
    icon: BarChart3,
    role: 'Аналитик',
    name: 'Нобелевский лауреат',
    principle: 'Что измеряется — управляется',
    insight: 'Каждый проект начинается с аудита цифр: сколько часов теряете, сколько стоит простой, какой ROI от автоматизации. Без метрики — это гадание, а не инженерия.',
    color: 'green',
  },
  {
    icon: Shield,
    role: 'Тактик',
    name: 'Военный стратег',
    principle: 'Асимметрия позиционирования',
    insight: 'Мы не студия с менеджерами и наценкой 300%. Мы не фрилансер, который исчезает. Мы — микро-мастерская: скорость инди + надёжность команды + прямой контакт с архитектором.',
    color: 'cyan',
  },
  {
    icon: Brain,
    role: 'Психолог',
    name: 'Мирового класса',
    principle: 'Архетип проводника',
    insight: 'Клиент не покупает код. Он покупает переход из хаоса в порядок. Мы не «пишем скрипты» — мы проводим через трансформацию: от ручного труда к системе, которая работает без вас.',
    color: 'green',
  },
]

export default function RoundTable() {
  return (
    <section className="py-24 relative bg-orbit-card/30 border-y border-orbit-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-cyan/10 border border-orbit-cyan/20 text-orbit-cyan text-xs font-mono mb-4">
            <Target size={12} />
            Методология мышления
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            За каждым проектом —{' '}
            <span className="gradient-text">Круглый стол</span> мирового класса
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            Не один разработчик с ноутбуком. А четыре перспективы: стратег,
            аналитик, тактик, психолог. Каждая задача проходит через все четыре
            фильтра — прежде чем вы получите решение.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {experts.map((expert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="orbit-card rounded-xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orbit-cyan/5 rounded-full blur-3xl group-hover:bg-orbit-cyan/10 transition-colors" />

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  expert.color === 'cyan' ? 'bg-orbit-cyan/10' : 'bg-orbit-green/10'
                }`}>
                  <expert.icon className={expert.color === 'cyan' ? 'text-orbit-cyan' : 'text-orbit-green'} size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      expert.color === 'cyan' 
                        ? 'bg-orbit-cyan/10 text-orbit-cyan' 
                        : 'bg-orbit-green/10 text-orbit-green'
                    }`}>
                      {expert.role}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {expert.principle}
                  </h3>
                  <p className="text-orbit-muted text-sm leading-relaxed mb-2">
                    {expert.insight}
                  </p>
                  <span className="text-xs text-orbit-muted/60 italic">
                    — {expert.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
