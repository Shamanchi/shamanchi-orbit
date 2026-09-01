'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertCircle } from 'lucide-react'

export default function FOMO() {
  const [slots, setSlots] = useState(2)

  // Имитация «живых» слотов — в реальности можно подключить к CRM
  useEffect(() => {
    // Можно заменить на реальный API-запрос к вашей CRM
    setSlots(2)
  }, [])

  return (
    <section className="py-8 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-orbit-cyan/5 border border-orbit-cyan/20"
        >
          <Clock className="text-orbit-cyan" size={18} />
          <span className="text-sm text-orbit-cyan">
            В сентябре осталось <span className="font-bold">{slots} слота</span> для проектов «Под ключ». 
            Следующий старт — через 2 недели.
          </span>
          <AlertCircle className="text-orbit-cyan" size={16} />
        </motion.div>
      </div>
    </section>
  )
}
