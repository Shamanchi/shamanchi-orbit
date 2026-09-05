import type { Metadata, Viewport } from 'next'
import './globals.css'
import ConstellationBackdrop from '@/components/ConstellationBackdrop'

const siteUrl = 'https://shamanchi.ru/'

export const viewport: Viewport = {
  themeColor: '#0B1120',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://shamanchi.ru'),
  title: 'Shamanchi Orbit — скрытые орбиты бизнес-процессов',
  description:
    'Большинство бизнесов управляют процессами, которых не существует. Мы находим скрытые орбиты и запускаем их. Археология процесса, одна точка рычага, автоматизация без хаоса. Аудит — 30 минут.',
  keywords: [
    'shamanchi orbit',
    'автоматизация бизнес-процессов',
    'археология процессов',
    'интеграция 1с crm telegram',
    'ai агенты',
    'python разработка',
    'точка рычага',
    'скрытые орбиты',
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
    url: siteUrl,
    siteName: 'Shamanchi Orbit',
    title: 'Shamanchi Orbit — скрытые орбиты бизнес-процессов',
    description:
      'Большинство бизнесов управляют процессами, которых не существует. Мы находим скрытые орбиты и запускаем их.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shamanchi Orbit — скрытые орбиты бизнес-процессов',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamanchi Orbit — скрытые орбиты бизнес-процессов',
    description:
      'Большинство бизнесов управляют процессами, которых не существует. Мы находим скрытые орбиты и запускаем их.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': siteUrl + '#organization',
        name: 'Shamanchi Orbit',
        url: siteUrl,
        logo: 'https://shamanchi.ru/favicon.svg',
        sameAs: [
          'https://github.com/Shamanchi',
          'https://t.me/shamanchi_dev',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': siteUrl + '#service',
        name: 'Shamanchi Orbit',
        url: siteUrl,
        image: 'https://shamanchi.ru/og-image.png',
        description:
          'Находим скрытые орбиты бизнес-процессов и запускаем их. Архитектура процесса, точка рычага, автоматизация без хаоса.',
        priceRange: 'По результатам аудита',
        areaServed: 'RU',
        founder: {
          '@id': 'https://github.com/Shamanchi',
        },
        parentOrganization: { '@id': siteUrl + '#organization' },
      },
      {
        '@type': 'WebSite',
        '@id': siteUrl + '#website',
        url: siteUrl,
        name: 'Shamanchi Orbit',
        publisher: { '@id': siteUrl + '#organization' },
      },
      {
        '@type': 'FAQPage',
        '@id': siteUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Что такое аудит орбиты',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Аудит — это 30 минут на карту ваших процессов. Находим разрывы между системами и одну точку рычага, где 20% усилий дают 80% результата.',
            },
          },
          {
            '@type': 'Question',
            name: 'Чем автоматизация без археологии опасна',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Автоматизация хаотичного процесса закрепляет хаос в коде. Сначала раскапываем процесс, потом строим систему.',
            },
          },
          {
            '@type': 'Question',
            name: 'Что значит «орбита»',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Орбита — это восстановленный поток данных между системами: 1С, CRM, Telegram, таблицы. Когда системы начинают говорить, ручной труд исчезает.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': siteUrl + '#howto',
        name: 'Как запускается орбита',
        description: 'Пять шагов от археологии процесса до роста без новых узких мест.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Археология',
            text: 'Карта процессов, точка рычага, разрыв между системами. 30 минут аудита.',
            url: siteUrl + '#process-step-1',
          },
          {
            '@type': 'HowToStep',
            name: 'Проектирование',
            text: 'Одна точка рычага: 20% усилий, которые дают 80% результата. Схема орбиты до строки кода.',
            url: siteUrl + '#process-step-2',
          },
          {
            '@type': 'HowToStep',
            name: 'Орбита',
            text: 'Сборка системы: данные начинают двигаться по восстановленному потоку.',
            url: siteUrl + '#process-step-3',
          },
          {
            '@type': 'HowToStep',
            name: 'Документация',
            text: 'Система понятна через 6 месяцев без нас. Документируем для вашего будущего себя.',
            url: siteUrl + '#process-step-4',
          },
          {
            '@type': 'HowToStep',
            name: 'Рост',
            text: 'Освобождённое внимание возвращается в бизнес. Рост до 10x без новых узких мест.',
            url: siteUrl + '#process-step-5',
          },
        ],
      },
    ],
  }

  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ConstellationBackdrop />
        {children}
      </body>
    </html>
  )
}
