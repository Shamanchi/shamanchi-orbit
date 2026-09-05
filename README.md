# Shamanchi Orbit

Лендинг для мастерской Shamanchi Orbit. Собран строго по `ORBIT_DEV_HANDBOOK.md`: тёмный терминальный стиль, один акцент Chi Cyan, моноширинные цифры, структура из 11 секций.

🔗 **Живой сайт:** https://shamanchi.github.io/shamanchi-orbit/
💬 **Telegram:** [@PavelYrevichh](https://t.me/PavelYrevichh)
📧 **Email:** lietman46@mail.com
🐙 **GitHub:** [github.com/Shamanchi](https://github.com/Shamanchi)

---

## Технический стек

- **Next.js 14** — App Router, статический экспорт в `dist/`
- **React 18 + TypeScript**
- **Tailwind CSS** — Deep Space `#0B1120`, акцент `#00D4FF`
- **Framer Motion** — анимации появления секций, `reducedMotion="user"`
- **react-three-fiber + drei** — звёздное поле и 3 орбиты в hero (lazy, `ssr: false`)
- **tsParticles** — fallback-звёзды, когда WebGL недоступен
- **three.quarks** — один циановый импульс в секции метрик
- **GitHub Actions** — автодеплой на GitHub Pages

## Структура

```
app/
├── layout.tsx      # SEO: Schema.org, Open Graph, FAQ, HowTo, шрифты
├── page.tsx        # Порядок секций по хендбуку
└── globals.css     # Цвета, терминал, грид, кнопки, static-stars
components/
├── Navbar.tsx      # Лого-орбита, 2 ссылки, кнопка «Аудит»
├── Hero.tsx        # Манифест + терминал, грид на фоне
├── SpaceBackdrop.tsx  # WebGL → tsParticles → CSS-звёзды
├── HeroOrbits.tsx  # r3f: звёзды + 3 эллиптические орбиты
├── TypedTerminal.tsx  # Печатающийся манифест
├── Physics.tsx     # 3 паттерна: орбиты / рычаг / петля
├── OrbitMap.tsx    # Диаграмма «до/после» (интерактив)
├── Process.tsx     # 5 шагов: архитектура → рост
├── Works.tsx       # 3 запущенные орбиты
├── Metrics.tsx     # 4 метрики + эффект quarks
├── MetricsQuarks.tsx  # one-shot циановый всплеск (WebGL)
├── Principles.tsx  # 3 запрета + Кто входит / Кто не входит
├── Pricing.tsx     # 3 тарифа, цены моноширинно
├── Audit.tsx       # 3 фильтрующих вопроса → Telegram/Email
├── Footer.tsx      # Символ, контакты, копирайт
├── OrbitMark.tsx   # Символ: точка + эллипс + точка
└── Text.tsx        # monoDigits — цифры только в JetBrains Mono
public/
├── favicon.svg     # Символ орбиты
├── og-image.png    # Open Graph 1200x630
├── robots.txt
└── sitemap.xml
```

## Локальный запуск

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # статический экспорт в dist/
```

## Деплой

- GitHub Actions: `.github/workflows/deploy.yml`
- Push в `main` → автодеплой на https://shamanchi.github.io/shamanchi-orbit/
- `basePath: '/shamanchi-orbit'`, `output: 'export'`
