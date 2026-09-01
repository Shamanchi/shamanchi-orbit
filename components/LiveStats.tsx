'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, Users, Zap } from 'lucide-react'

const stats = [
  { icon: Zap, label: 'Проектов выполнено', value: 47, suffix: '+' },
  { icon: Clock, label: 'Часов сэкономлено клиентам', value: 1200, suffix: '+' },
  { icon: TrendingUp, label: 'ROI средний', value: 340, suffix: '%' },
  { icon: Users, label: 'Повторных обращений', value: 78, suffix: '%' },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target])

  return (
    <span className="font-mono text-3xl font-bold gradient-text">
      {count.toLocaleString('ru-RU')}{suffix}
    </span>
  )
}

export default function LiveStats() {
  return (
    <section className="py-16 relative border-y border-orbit-border bg-orbit-card/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-orbit-cyan/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="text-orbit-cyan" size={20} />
              </div>
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <p className="text-orbit-muted text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
