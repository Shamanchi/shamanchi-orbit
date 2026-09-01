# Shamanchi Orbit

**Автоматизация бизнес-процессов. Python · Парсинг · Telegram-боты · API-интеграции · AI.**

Продающий лендинг для AI-мастерской Shamanchi Orbit. От идеи до запуска за 3-7 дней. С документацией и fallback'ами.

🔗 **Живой сайт:** https://shamanchi.github.io/shamanchi-orbit/  
💬 **Telegram:** [@PavelYrevichh](https://t.me/PavelYrevichh)  
📧 **Email:** lietman46@mail.com  
🐙 **GitHub:** [github.com/Shamanchi](https://github.com/Shamanchi)

---

## Технический стек

- **Next.js 14** — App Router, статический экспорт
- **React 18 + TypeScript**
- **Tailwind CSS** — тёмная тема, кастомная цветовая схема
- **Framer Motion** — анимации при скролле
- **Lucide React** — иконки
- **GitHub Actions** — автодеплой на GitHub Pages

## Структура

```
app/
├── layout.tsx      # SEO: Schema.org, Open Graph, FAQ, HowTo
├── page.tsx        # Главная страница
└── globals.css     # Стили, анимации
components/
├── Navbar.tsx      # Навигация
├── Hero.tsx        # Hero + анимированный терминал
├── Pain.tsx        # Секция "Боль"
├── Process.tsx     # 5 шагов процесса
├── Works.tsx       # Портфолио проектов
├── WhyMe.tsx       # Почему я + ограничения
├── Pricing.tsx     # 3 тарифа
└── Footer.tsx      # Подвал
public/
├── og-image.png    # Open Graph 1200x630
├── robots.txt      # Индексация
└── sitemap.xml     # Карта сайта
```

## Локальный запуск

```bash
npm install
npm run dev
# Открыть http://localhost:3000
```

## Сборка

```bash
npm run build
# Результат в папке dist/
```

## Деплой

Автоматический через GitHub Actions. При каждом push в `main` сайт пересобирается и выкладывается на GitHub Pages.

---

*Если у вас есть задача, которую приходится делать руками больше 2 раз — её нужно автоматизировать.*
