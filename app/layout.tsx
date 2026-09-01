import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://shamanchi.github.io'),
  title: 'Shamanchi Orbit — Автоматизация бизнес-процессов | Python, Боты, API, AI',
  description:
    'Каждый день ручной работы = 200 часов потерь в месяц. Автоматизация бизнес-процессов: Telegram-боты с CRM, API-интеграции 1С·amoCRM·Битрикс24, AI-агенты, скрипты автоматизации. От идеи до запуска за 3-7 дней. AGENT.md + Docker + fallback. Ответ за 15 мин. Бесплатный аудит → @PavelYrevichh',
  keywords: [
    'автоматизация бизнеса',
    'telegram бот',
    'api интеграции',
    'ai агенты',
    'python разработчик',
    'n8n',
    'fastapi',
    '1с интеграция',
    'amocrm интеграция',
    'битрикс24 интеграция',
    'google sheets автоматизация',
    'excel автоматизация',
    'docker деплой',
    'ci cd настройка',
    'shamanchi',
    'shamanchi orbit',
    'pavel yrevich',
  ],
  authors: [{ name: 'Shamanchi', url: 'https://github.com/Shamanchi' }],
  creator: 'Shamanchi Orbit',
  publisher: 'Shamanchi Orbit',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://shamanchi.github.io/shamanchi-orbit/',
    siteName: 'Shamanchi Orbit',
    title: 'Shamanchi Orbit — Автоматизация бизнес-процессов',
    description:
      'Автоматизация: Telegram-боты, API-интеграции, AI-агенты, скрипты. 3-7 дней. AGENT.md + Docker + fallback. Ответ за 15 мин. Бесплатный аудит → @PavelYrevichh',
    images: [
      {
        url: '/shamanchi-orbit/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shamanchi Orbit — Автоматизация бизнес-процессов',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamanchi Orbit — Автоматизация бизнес-процессов',
    description:
      'Автоматизация: боты, интеграции, AI. 3-7 дней. AGENT.md + Docker. Ответ за 15 мин.',
    images: ['/shamanchi-orbit/og-image.png'],
    creator: '@PavelYrevichh',
  },
  alternates: {
    canonical: 'https://shamanchi.github.io/shamanchi-orbit/',
  },
  verification: {
    google: 'добавь_код_при_необходимости',
    yandex: 'добавь_код_при_необходимости',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'ProfessionalService',
                  '@id': 'https://shamanchi.github.io/shamanchi-orbit/#organization',
                  name: 'Shamanchi Orbit',
                  alternateName: 'Shamanchi',
                  description:
                    'Автоматизация бизнес-процессов: Telegram-боты, API-интеграции, AI-агенты, скрипты автоматизации. Python, FastAPI, Docker, n8n.',
                  url: 'https://shamanchi.github.io/shamanchi-orbit/',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://shamanchi.github.io/shamanchi-orbit/og-image.png',
                    width: 1200,
                    height: 630,
                  },
                  sameAs: [
                    'https://github.com/Shamanchi',
                    'https://t.me/PavelYrevichh',
                  ],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'technical support',
                    email: 'lietman46@mail.com',
                    url: 'https://t.me/PavelYrevichh',
                    availableLanguage: ['Russian'],
                    hoursAvailable: {
                      '@type': 'OpeningHoursSpecification',
                      description: 'Ответ за 15 минут в рабочее время',
                    },
                  },
                  areaServed: {
                    '@type': 'Place',
                    name: 'Россия, СНГ, удалённая работа',
                  },
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Услуги автоматизации',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Быстрый старт',
                          description:
                            'Типовая задача: простой бот, интеграция 2 сервисов, скрипт автоматизации. 1-2 дня.',
                        },
                        price: '8000',
                        priceCurrency: 'RUB',
                        availability: 'https://schema.org/InStock',
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Под ключ',
                          description:
                            'Сложный проект: бот с админкой, интеграция 3+ сервисов, система с БД и деплоем. 3-7 дней.',
                        },
                        price: '25000',
                        priceCurrency: 'RUB',
                        availability: 'https://schema.org/InStock',
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Поддержка',
                          description:
                            'Доработка, мониторинг, исправление багов. От 5 000 ₽/мес.',
                        },
                        price: '5000',
                        priceCurrency: 'RUB',
                        availability: 'https://schema.org/InStock',
                      },
                    ],
                  },
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://shamanchi.github.io/shamanchi-orbit/#faq',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Сколько стоит автоматизация одного процесса?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Типовая задача (бот, интеграция, скрипт) — от 8 000 ₽, 1-2 дня. Сложный проект — от 25 000 ₽, 3-7 дней. Точная оценка после бесплатного 30-минутного аудита.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Что если система перестанет работать через месяц?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Все проекты включают обработку ошибок, логирование и fallback-файлы. Если API-источник меняет формат — адаптирую в рамках поддержки или гарантийного периода (30 дней для проектов "Под ключ").',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Как быстро вы отвечаете?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'В Telegram — в среднем за 15 минут в рабочее время. Для срочных задач — уведомления на телефон.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Вы работаете один или у вас команда?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Разработка — лично. Для сложных проектов привлекаю проверенных специалистов (DevOps, дизайнер). Вы всегда общаетесь со мной напрямую, без менеджеров-посредников.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Можно ли посмотреть примеры кода до оплаты?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Да — все проекты с открытым кодом на GitHub: github.com/Shamanchi. Можно изучить архитектуру, качество кода и документацию (AGENT.md + README) до контакта.',
                      },
                    },
                  ],
                },
                {
                  '@type': 'HowTo',
                  '@id': 'https://shamanchi.github.io/shamanchi-orbit/#process',
                  name: 'Как автоматизировать бизнес-процесс за 5 шагов',
                  description:
                    'Процесс от аудита до запуска: находим узкие места, проектируем архитектуру, разрабатываем с AI-ускорением, тестируем с fallback, деплоим с документацией.',
                  totalTime: 'P7D',
                  step: [
                    {
                      '@type': 'HowToStep',
                      name: 'Аудит',
                      text: 'Находим узкие места. 30 минут, бесплатно. Вы получаете карту боли и приоритетов.',
                      url: 'https://shamanchi.github.io/shamanchi-orbit/#process-step-1',
                    },
                    {
                      '@type': 'HowToStep',
                      name: 'Архитектура',
                      text: 'Проектируем масштабируемое решение. Закладываем рост сразу, не переписываем потом.',
                      url: 'https://shamanchi.github.io/shamanchi-orbit/#process-step-2',
                    },
                    {
                      '@type': 'HowToStep',
                      name: 'AI-ускоренная разработка',
                      text: 'Быстро, но с контролем качества и безопасности. Код, который читается, а не «работает somehow».',
                      url: 'https://shamanchi.github.io/shamanchi-orbit/#process-step-3',
                    },
                    {
                      '@type': 'HowToStep',
                      name: 'Тестирование + fallback',
                      text: 'Обработка ошибок, логирование, fallback-файлы. Ничего не падает в 3 ночи без вашего ведома.',
                      url: 'https://shamanchi.github.io/shamanchi-orbit/#process-step-4',
                    },
                    {
                      '@type': 'HowToStep',
                      name: 'Деплой + документация',
                      text: 'AGENT.md + README + отчёты. Вы получаете продукт, а не «скрипт на коленке».',
                      url: 'https://shamanchi.github.io/shamanchi-orbit/#process-step-5',
                    },
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://shamanchi.github.io/shamanchi-orbit/#website',
                  url: 'https://shamanchi.github.io/shamanchi-orbit/',
                  name: 'Shamanchi Orbit',
                  publisher: {
                    '@id': 'https://shamanchi.github.io/shamanchi-orbit/#organization',
                  },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate:
                        'https://shamanchi.github.io/shamanchi-orbit/?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
