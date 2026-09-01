'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Download, ArrowRight, CheckCircle } from 'lucide-react'
import { reachGoal } from '@/components/Analytics'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Здесь будет интеграция с Google Sheets / Telegram-ботом
      // Пока — имитация для демо
      setSubmitted(true)
      reachGoal('email_capture')
    }
  }

  return (
    <section className="py-24 relative bg-orbit-card/30 border-y border-orbit-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="orbit-card rounded-2xl p-8 md:p-12 border-orbit-cyan/20"
        >
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-orbit-cyan/10 flex items-center justify-center mx-auto mb-4">
                  <Download className="text-orbit-cyan" size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  <span className="gradient-text">5 процессов</span>, которые стоит автоматизировать в первую очередь
                </h2>
                <p className="text-orbit-muted max-w-xl mx-auto">
                  Чек-лист + примеры кода + оценка ROI для каждого процесса. 
                  Бесплатно. Без спама. Только польза.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 bg-orbit-bg border border-orbit-border rounded-lg text-white placeholder-orbit-muted focus:border-orbit-cyan focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-orbit-cyan text-orbit-bg font-semibold rounded-lg hover:bg-cyan-400 transition-all glow-cyan"
                  >
                    <Mail size={16} />
                    Получить PDF
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <p className="text-center text-xs text-orbit-muted mt-3">
                  Email используется только для отправки чек-листа. Не передаём третьим лицам.
                </p>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <CheckCircle className="text-orbit-green mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">Чек-лист отправлен!</h3>
              <p className="text-orbit-muted">
                Проверьте email. Если письма нет — загляните в папку «Спам». 
                Также напишите мне в Telegram: @PavelYrevichh
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
