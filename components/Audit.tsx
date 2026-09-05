'use client'

import { useMemo, useState } from 'react'
import Reveal from '@/components/Reveal'
import { AnimatePresence, motion } from 'framer-motion'
import { monoDigits } from '@/components/Text'
import ReplyStatus, { REPLY_LABELS, useReplyStatus } from '@/components/ReplyStatus'
import AuditStars from '@/components/AuditStars'

const questions: Array<{ title: string; options: string[] }> = [
  {
    title: 'Что повторяется руками чаще 2 раз в неделю',
    options: [
      'Отчёты и перенос данных',
      'Переписка и согласования',
      'Загрузка и обработка файлов',
      'Не знаю — для этого аудит',
    ],
  },
  {
    title: 'Сколько систем не разговаривают между собой',
    options: ['Одна', 'Две-три', 'Больше трёх', 'Не знаю'],
  },
  {
    title: 'Готовы потратить 30 минут на аудит процесса',
    options: ['Да', 'Сначала покажите пример', 'Нет — это не ваш проект'],
  },
]

export default function Audit() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const answeredCount = Object.keys(answers).length
  const complete = answeredCount === questions.length

  const summary = useMemo(() => {
    const lines = [
      'Аудит Shamanchi Orbit',
      ...questions.map((question, i) => `${question.title}: ${answers[i] ?? '—'}`),
    ]
    return lines.join('\n')
  }, [answers])

  const telegramUrl = `https://t.me/Shamanchii?text=${encodeURIComponent(summary)}`
  const emailUrl = `mailto:lietman46@mail.com?subject=${encodeURIComponent(
    'Аудит орбиты — Shamanchi Orbit'
  )}&body=${encodeURIComponent(summary)}`

  const [copied, setCopied] = useState(false)
  const replyStatus = useReplyStatus()

  const copySummary = () => {
    if (!summary) return
    navigator.clipboard
      .writeText(summary)
      .then(() => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      })
      .catch(() => {})
  }

  return (
    <section id="audit" className="relative py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal className="mb-14 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mark" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              08 · аудит
            </span>
          </div>
          <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Три вопроса. Дальше — карта вашей орбиты
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-dim">
            {monoDigits(
              'Вопросы фильтруют заявку: 3 ответа — и мы понимаем, ваш ли это проект. Без форм и бэкенда — заявка уходит в Telegram или на почту.'
            )}
          </p>
        </Reveal>

          <div className="mt-10 max-w-xl border-l border-white/[0.08] pl-5">
            <p className="text-[15px] leading-relaxed text-ink">
              Аудит веду лично. 30 минут, без записи, без продажи в лоб.
            </p>
            <p className="mt-2 font-mono text-xs text-ink-dim">— Павел · Shamanchi Orbit</p>
          </div>

        <div className="glass-card rounded-lg p-6 sm:p-10 lg:p-12">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
            <div>
              {questions.map((question, i) => {
                const selected = answers[i]
                return (
                  <div
                    key={question.title}
                    className="border-t border-white/[0.08] py-9 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                        Q{i + 1}
                      </span>
                      <span className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <h3 className="mb-6 mt-5 font-display text-xl font-semibold tracking-tight text-ink">
                      {monoDigits(question.title)}?
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {question.options.map((option) => {
                        const active = selected === option
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, [i]: active ? '' : option }))
                            }
                            className={`rounded-sm border px-4 py-2.5 text-left text-sm transition-colors ${
                              active
                                ? 'border-white/[0.35] text-ink'
                                : 'border-white/[0.1] text-ink-dim hover:border-white/[0.25] hover:text-ink'
                            }`}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="lg:pt-2">
              <ReplyStatus />
              <p className="mt-3 font-mono text-xs text-ink-dim">заполнено: {answeredCount}/3</p>

              <AnimatePresence>
                {complete && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6"
                  >
                    <div className="terminal relative overflow-hidden rounded-md p-6 sm:p-7">
                      <AuditStars />
                      <div className="relative">
                      <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-3">
                        <span className="h-2 w-2 rounded-full bg-ink-dim/25" />
                        <span className="h-2 w-2 rounded-full bg-ink-dim/25" />
                        <span className="h-2 w-2 rounded-full bg-ink-dim/25" />
                        <span className="ml-3 font-mono text-xs text-ink-dim">orbit@audit — summary</span>
                      </div>
                      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-[13px] leading-6 text-ink">
                        {summary}
                      </pre>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a
                          href={telegramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-audit px-6 py-3 text-sm"
                        >
                          Отправить в Telegram
                        </a>
                        <a
                          href={emailUrl}
                          className="btn-ghost px-6 py-3 text-sm text-ink-dim hover:text-ink"
                        >
                          Написать на почту
                        </a>
                        <button
                          type="button"
                          onClick={copySummary}
                          className="btn-ghost px-6 py-3 text-sm text-ink-dim hover:text-ink"
                        >
                          {copied ? 'Скопировано' : 'Скопировать'}
                        </button>
                      </div>
                      <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-ink-dim">
                        <span
                          className={
                            replyStatus === 'online'
                              ? 'h-1.5 w-1.5 rounded-full bg-chi'
                              : 'h-1.5 w-1.5 rounded-full bg-ink-dim/40'
                          }
                        />
                        <span>{REPLY_LABELS[replyStatus]}</span>
                        <span>· @Shamanchii · lietman46@mail.com</span>
                      </p>
                    </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!complete && (
                <p className="mt-6 text-sm leading-relaxed text-ink-dim">
                  {monoDigits(
                    'Никаких баз данных. После 3 ответов вы увидите готовое сообщение для Telegram или почты.'
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-20 max-w-3xl border-t border-white/[0.06] pt-9">
          <p className="text-[15px] leading-relaxed text-ink-dim">
            Не готовы к аудиту прямо сейчас — напишите «карта» в Telegram или на почту. Пришлю карту разрывов для вашей ниши. Без 30 минут и обязательств.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-ink-dim">
            <a
              href="https://t.me/Shamanchii"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              @Shamanchii — напишите «карта»
            </a>
            <a
              href="mailto:lietman46@mail.com?subject=%D0%9A%D0%B0%D1%80%D1%82%D0%B0%20%D1%80%D0%B0%D0%B7%D1%80%D1%8B%D0%B2%D0%BE%D0%B2"
              className="transition-colors hover:text-ink"
            >
              lietman46@mail.com — тема «карта разрывов»
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
