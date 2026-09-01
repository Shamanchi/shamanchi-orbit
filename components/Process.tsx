'use client'

import { motion } from 'framer-motion'
import { Search, Compass, Zap, ShieldCheck, Rocket } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Аудит',
    desc: 'Находим узкие места. 30 минут, бесплатно. Вы получаете карту боли и приоритетов.',
    time: '30 мин',
  },
  {
    num: '02',
    icon: Compass,
    title: 'Архитектура',
    desc: 'Проектируем масштабируемое решение. Закладываем рост сразу, не переписываем потом.',
    time: '1 день',
  },
  {
    num: '03',
    icon: Zap,
    title: 'AI-ускоренная разработка',
    desc: 'Быстро, но с моим контролем качества и безопасности. Код, который читается, а не «работает somehow».',
    time: '2-5 дней',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Тестирование + fallback',
    desc: 'Обработка ошибок, логирование, fallback-файлы. Ничего не падает в 3 ночи без вашего ведома.',
    time: '1 день',
  },
  {
    num: '05',
    icon: Rocket,
    title: 'Деплой + документация',
    desc: 'AGENT.md + README + отчёты. Вы получаете продукт, а не «скрипт на коленке».',
    time: '1 день',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-24 relative bg-orbit-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-cyan/10 border border-orbit-cyan/20 text-orbit-cyan text-xs font-mono mb-4">
            <Zap size={12} />
            Как это работает
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            От хаоса к <span className="gradient-text">системе</span> за 5
            шагов
          </h2>
          <p className="text-orbit-muted max-w-2xl mx-auto">
            Не «напишу скрипт и исчезну». А процесс, в котором вы всегда знаете,
            на каком этапе проект.
          </p>
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="orbit-card rounded-xl p-6 flex flex-col sm:flex-row items-start gap-6 group"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-orbit-cyan/10 border border-orbit-cyan/20 flex items-center justify-center">
                <step.icon className="text-orbit-cyan" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-orbit-cyan">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <span className="ml-auto text-xs font-mono text-orbit-muted bg-orbit-bg px-2 py-1 rounded">
                    {step.time}
                  </span>
                </div>
                <p className="text-orbit-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
