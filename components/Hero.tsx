'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, ArrowRight, Terminal } from 'lucide-react'
import { reachGoal } from '@/components/Analytics'

const codeLines = [
  'import { automate } from "shamanchi-orbit"',
  'const pain = detectManualWork(business)',
  'const solution = buildSystem(pain)',
  'deploy(solution) // 3-7 days',
  'watch(productivity.grow) // 10x',
]

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-cyan/10 border border-orbit-cyan/20 text-orbit-cyan text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-orbit-cyan animate-pulse" />
            Доступен для проектов
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Автоматизирую{' '}
            <span className="gradient-text">бизнес-процессы</span>, которые
            отнимают у вас{' '}
            <span className="text-orbit-green">10+ часов в неделю</span>
          </h1>

          <p className="text-lg text-orbit-muted mb-8 max-w-xl">
            Python · Парсинг · Telegram-боты · API-интеграции · AI.
            <br />
            От идеи до запуска за{' '}
            <span className="text-white font-semibold">3-7 дней</span>. С
            документацией и fallback&apos;ами.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://t.me/PavelYrevichh"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal('audit_click')}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-orbit-cyan text-orbit-bg font-semibold rounded-lg hover:bg-cyan-400 transition-all glow-cyan"
            >
              <Send size={18} />
              Получить бесплатный аудит
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/Shamanchi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal('github_click')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-orbit-border text-white rounded-lg hover:border-orbit-cyan/50 hover:bg-orbit-cyan/5 transition-all"
            >
              <Github size={18} />
              Посмотреть работы
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-orbit-muted">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orbit-green" />
              Ответ за 15 мин
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orbit-green" />
              Честные сроки
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orbit-green" />
              Документация включена
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="rounded-xl overflow-hidden border border-orbit-border bg-orbit-card shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-orbit-bg border-b border-orbit-border">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 flex items-center gap-2 text-xs text-orbit-muted">
                <Terminal size={12} />
                <span>shamanchi@orbit:~$ automate</span>
              </div>
            </div>
            <div className="p-6 font-mono text-sm space-y-2 min-h-[280px]">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i < visibleLines ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-orbit-muted select-none w-6 text-right">{i + 1}</span>
                  <span className={`${
                    line.includes('import') ? 'text-purple-400' :
                    line.includes('const') ? 'text-orbit-cyan' :
                    line.includes('deploy') ? 'text-orbit-green' :
                    line.includes('watch') ? 'text-yellow-400' : 'text-gray-300'
                  }`}>{line}</span>
                </motion.div>
              ))}
              {visibleLines >= codeLines.length && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mt-4">
                  <span className="text-orbit-green">$</span>
                  <span className="text-orbit-muted">_</span>
                  <span className="w-2 h-4 bg-orbit-cyan cursor-blink" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
