'use client'

import { motion } from 'framer-motion'
import { Eye, Shield, Clock, Brain, XCircle, CheckCircle2 } from 'lucide-react'

const strengths = [
  {
    icon: Clock,
    title: 'Скорость',
    desc: 'AI-ускоренная разработка. Неделя задачи → 2-3 дня. Но не за счёт качества — за счёт инструментов.',
  },
  {
    icon: Eye,
    title: 'Прозрачность',
    desc: 'Структурированные отчёты, промежуточные демо, честные сроки. Вы всегда знаете, на каком этапе проект.',
  },
  {
    icon: Shield,
    title: 'Надёжность',
    desc: 'Обработка ошибок, логирование, fallback-файлы, мониторинг. Если что-то пойдёт не так — я узнаю первым.',
  },
  {
    icon: Brain,
    title: 'Понимание бизнеса',
    desc: 'Смотрю не «что в ТЗ», а «какую проблему вы решаете». Предлагаю, а не просто исполняю.',
  },
]

const limitations = [
  'Не беру задачи на WordPress / 1С-разработку — это не мой профиль.',
  'Простые задачи — 1-2 дня, сложные — до недели. Не обещаю «за вечер».',
  'Если вижу риск — говорю сразу, а не обещаю невозможное.',
]

export default function WhyMe() {
  return (
    <section id="whyme" className="py-24 relative bg-orbit-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-cyan/10 border border-orbit-cyan/20 text-orbit-cyan text-xs font-mono mb-4">
            <Shield size={12} />
            Честность прежде всего
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Почему <span className="gradient-text">со мной</span>
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            И — что важнее — почему{' '}
            <span className="text-white">не со мной</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Strengths */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="text-orbit-green" size={20} />
              Что получаете
            </h3>
            {strengths.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-orbit-cyan/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-orbit-cyan" size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-orbit-muted text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Limitations (Pratfall effect) */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <XCircle className="text-red-400" size={20} />
              Что НЕ получаете
            </h3>
            <div className="orbit-card rounded-xl p-6 border-red-500/20">
              <p className="text-orbit-muted text-sm mb-4">
                Я не беру всё подряд. Специализируюсь на парсинге, ботах,
                интеграциях и автоматизации. Если задача вне профиля — скажу
                честно и порекомендую коллегу.
              </p>
              <div className="space-y-3">
                {limitations.map((limit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-orbit-muted"
                  >
                    <span className="text-red-400 mt-1">×</span>
                    {limit}
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-xs text-orbit-muted italic">
              Эффект Пратфолла: показывать 1-2 ограничения повышает доверие
              сильнее, чем 100% обещаний. Я проверял.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
