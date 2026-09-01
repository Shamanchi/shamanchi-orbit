'use client'

import { motion } from 'framer-motion'
import { User, Rocket, Target, Heart } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-cyan/10 border border-orbit-cyan/20 text-orbit-cyan text-xs font-mono mb-4">
            <User size={12} />
            Кто за проектом
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Не студия. Не фрилансер. <span className="gradient-text">Микро-мастерская</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 rounded-2xl bg-orbit-cyan/10 border border-orbit-cyan/20 flex items-center justify-center mx-auto md:mx-0 mb-6">
              <User className="text-orbit-cyan" size={48} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Павел — архитектор систем</h3>
            <div className="space-y-3 text-orbit-muted text-sm">
              <p>
                Я не «программист, который пишет код». Я — человек, который видит, как рутина 
                убивает бизнес, и строит системы, которые работают без постоянного контроля.
              </p>
              <p>
                Начинал как junior-разработчик, прошёл путь через фриланс, понял, что большинство 
                заказчиков получают «скрипт на коленке», который падает через месяц. Решил, что 
                буду делать иначе: с документацией, с fallback, с поддержкой.
              </p>
              <p>
                Сейчас — микро-мастерская Shamanchi Orbit. 47+ проектов. 0 критических падений 
                в продакшене. 78% клиентов возвращаются.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="orbit-card rounded-xl p-5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-orbit-cyan/10 flex items-center justify-center flex-shrink-0">
                <Target className="text-orbit-cyan" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Принцип: архитектура прежде кода</h4>
                <p className="text-orbit-muted text-sm">Сначала думаю, как система будет жить 6 месяцев. Потом пишу первую строку.</p>
              </div>
            </div>
            <div className="orbit-card rounded-xl p-5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-orbit-green/10 flex items-center justify-center flex-shrink-0">
                <Rocket className="text-orbit-green" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Скорость: AI + контроль качества</h4>
                <p className="text-orbit-muted text-sm">Использую AI-инструменты для ускорения, но каждая строка проходит мою проверку.</p>
              </div>
            </div>
            <div className="orbit-card rounded-xl p-5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-orbit-cyan/10 flex items-center justify-center flex-shrink-0">
                <Heart className="text-orbit-cyan" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Честность: если не мой профиль — скажу</h4>
                <p className="text-orbit-muted text-sm">Не беру WordPress, не беру «на вчера», не обещаю невозможное. Экономлю время обеих сторон.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
