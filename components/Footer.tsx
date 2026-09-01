'use client'

import { Github, Send, Mail } from 'lucide-react'
import { reachGoal } from '@/components/Analytics'

export default function Footer() {
  return (
    <footer className="py-12 border-t border-orbit-border bg-orbit-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold mb-2">
              <span className="gradient-text">Shamanchi</span>
              <span className="text-white ml-1">Orbit</span>
            </div>
            <p className="text-orbit-muted text-sm">
              Автоматизация бизнес-процессов. Python · Парсинг · Боты · Интеграции · AI.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Контакты</h4>
            <div className="space-y-2">
              <a href="https://t.me/PavelYrevichh" target="_blank" rel="noopener noreferrer"
                 onClick={() => reachGoal('telegram_click')}
                 className="flex items-center gap-2 text-sm text-orbit-muted hover:text-orbit-cyan transition-colors">
                <Send size={16} />
                @PavelYrevichh
              </a>
              <a href="mailto:lietman46@mail.com"
                 className="flex items-center gap-2 text-sm text-orbit-muted hover:text-orbit-cyan transition-colors">
                <Mail size={16} />
                lietman46@mail.com
              </a>
              <a href="https://github.com/Shamanchi" target="_blank" rel="noopener noreferrer"
                 onClick={() => reachGoal('github_click')}
                 className="flex items-center gap-2 text-sm text-orbit-muted hover:text-orbit-cyan transition-colors">
                <Github size={16} />
                github.com/Shamanchi
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Навигация</h4>
            <div className="space-y-2">
              <a href="#process" className="block text-sm text-orbit-muted hover:text-orbit-cyan transition-colors">Процесс</a>
              <a href="#works" className="block text-sm text-orbit-muted hover:text-orbit-cyan transition-colors">Работы</a>
              <a href="#whyme" className="block text-sm text-orbit-muted hover:text-orbit-cyan transition-colors">Почему я</a>
              <a href="#pricing" className="block text-sm text-orbit-muted hover:text-orbit-cyan transition-colors">Цены</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-orbit-border text-center">
          <p className="text-orbit-muted text-xs">
            Если у вас есть задача, которую приходится делать руками больше 2 раз — её нужно автоматизировать.{' '}
            <a href="https://t.me/PavelYrevichh" target="_blank" rel="noopener noreferrer"
               onClick={() => reachGoal('telegram_click')}
               className="text-orbit-cyan hover:underline">Напишите мне</a>.
          </p>
          <p className="text-orbit-muted/50 text-xs mt-2">
            © 2026 Shamanchi Orbit. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
