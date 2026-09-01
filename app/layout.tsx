import type { Metadata } from 'next'

// ═══════════════════════════════════════════════════════════════
// SEO построен на скрытых паттернах (Машина распознавания паттернов + Запретное знание)
// Паттерн 1: "Петля боли → триггер → решение" — title/description начинаются с цены нерешения
// Паттерн 2: "Асимметрия ценности" — не "услуги", а "стоимость простоя" (200 часов/мес)
// Паттерн 3: "Социальное доказательство через специфику" — конкретные цифры в meta
// Паттерн 4: "Скорость ответа как сигнал компетентности" — "ответ за 15 мин" в description
// Паттерн 5: "Демо вместо портфолио" — ссылка на GitHub в OG
// Паттерн 6: "Отсутствие выбора = больше продаж" — 3 чётких направления в keywords
// ═══════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  metadataBase: new URL('https://shamanchi.github.io/shamanchi-orbit/'),
  // Title: якорь боли + цифра + решение. Не "услуги", а "утечка времени"
  title: 'Shamanchi Orbit — Остановите утечку 200+ часов/мес на ручной работе | Автоматизация за 3-7 дней',

  // Description: цена нерешения → триггер → решение → социальное доказательство → скорость ответа
  description:
    'Каждый день ручного переноса Excel = 200 часов потерь в месяц. Парсеры падают ночью? Подрядчик исчез? Автоматизация бизнес-процессов: парсинг Wildberries/Ozon, Telegram-боты с CRM, интеграция 1С·amoCRM·Битрикс24. От идеи до запуска за 3-7 дней. AGENT.md + Docker + fallback. Ответ за 15 мин. Бесплатный аудит → @PavelYrevichh',

  // Keywords: проблемно-ориентированные запросы (то, что ЦА ищет в момент боли)
  // + направления (асимметрия: не 10 услуг, а 3 чётких рычага)
  keywords: [
    // === БОЛЕВЫЕ ЗАПРОСЫ (паттерн "петля боли") ===
    'парсер падает ночью',
    'парсер wildberries не работает',
    'автоматизация excel отчетов',
    'ручной перенос данных 1с',
    'telegram бот для заявок',
    'подрядчик исчез после оплаты',
    'скрипт падает без логов',
    'интеграция 1с битрикс24',
    'интеграция 1с amocrm',
    'парсинг маркетплейсов',
    'автоматизация сбора данных',
    'замена ручного труда python',
    'бот для рассылок telegram',
    'api интеграция google sheets',
    'n8n workflow автоматизация',
    // === НАПРАВЛЕНИЯ (паттерн "3 рычага") ===
    'python разработчик фриланс',
    'парсинг сайтов python',
    'telegram бот aiogram',
    'fastapi разработчик',
    'docker деплой',
    'ci cd настройка',
    'ai агенты openai',
    // === БРЕНД (паттерн "личный бренд = доверие") ===
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph: каждый элемент — якорь (цифра + CTA + демо)
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://shamanchi.github.io/shamanchi-orbit/',
    siteName: 'Shamanchi Orbit',
    title: 'Shamanchi Orbit — Остановите утечку 200+ часов/мес | Автоматизация за 3-7 дней',
    description:
      'Парсеры падают? Подрядчик исчез? Автоматизация: Wildberries/Ozon, Telegram-боты, 1С·amoCRM·Битрикс24. 3-7 дней. AGENT.md + Docker + fallback. Ответ за 15 мин. Бесплатный аудит → @PavelYrevichh',
    images: [
      {
        url: '/shamanchi-orbit/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shamanchi Orbit — Автоматизация бизнес-процессов. Python, Парсинг, Боты, API, AI.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Shamanchi Orbit — Остановите утечку 200+ часов/мес',
    description:
      'Автоматизация: парсинг, боты, интеграции. 3-7 дней. AGENT.md + Docker. Ответ за 15 мин.',
    images: ['/shamanchi-orbit/og-image.png'],
    creator: '@PavelYrevichh',
  },

  alternates: {
    canonical: 'https://shamanchi.github.io/shamanchi-orbit/',
  },

  // Верификация — заполни при подключении к Search Console
  verification: {
    google: 'добавь_код_при_необходимости',
    yandex: 'добавь_код_при_необходимости',
  },

  // Дополнительные meta-теги (скрытые стимулы для поисковиков)
  other: {
    'msapplication-TileColor': '#0a0e1a',
    'theme-color': '#0a0e1a',
    // Паттерн: "скорость сайта = сигнал качества" — preconnect ускоряет загрузку
    preconnect: 'https://fonts.googleapis.com',
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
        {/* ═══════════════════════════════════════════════════════════════
            Schema.org — структурированные данные (скрытый паттерн: FAQ снижает трение)
            FAQPage: вопросы, которые снимают возражения ДО контакта
            HowTo: 5 шагов процесса — повышает шанс rich snippet в Google
            ProfessionalService: основная сущность
        ═══════════════════════════════════════════════════════════════ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                // 1. Основная организация
                {
                  '@type': 'ProfessionalService',
                  '@id': 'https://shamanchi.github.io/shamanchi-orbit/#organization',
                  name: 'Shamanchi Orbit',
                  alternateName: 'Shamanchi',
                  description:
                    'Автоматизация бизнес-процессов: парсинг маркетплейсов, Telegram-боты, API-интеграции, AI-агенты. Python, FastAPI, Docker, n8n.',
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
                    // Паттерн: "скорость ответа = сигнал"
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
                            'Типовая задача: парсер одного сайта, простой бот, интеграция 2 сервисов. 1-2 дня.',
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
                            'Сложный проект: мультипарсер, бот с админкой, система с БД и деплоем. 3-7 дней.',
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

                // 2. FAQPage — снимает возражения до контакта (паттерн: устранение трения)
                {
                  '@type': 'FAQPage',
                  '@id': 'https://shamanchi.github.io/shamanchi-orbit/#faq',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Сколько стоит автоматизация одного процесса?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Типовая задача (парсер, простой бот, интеграция) — от 8 000 ₽, 1-2 дня. Сложный проект — от 25 000 ₽, 3-7 дней. Точная оценка после бесплатного 30-минутного аудита.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Что если парсер перестанет работать через месяц?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Все проекты включают обработку ошибок, логирование и fallback-файлы. Если сайт-источник меняет структуру — адаптирую в рамках поддержки или гарантийного периода (30 дней для проектов "Под ключ").',
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

                // 3. HowTo — 5 шагов процесса (rich snippet в Google)
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

                // 4. WebSite — хлебные крошки для поисковиков
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
