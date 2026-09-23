# Архитектура репозитория

## Структура каталогов

```
JWshop/
├─ client/                     # Next.js фронтенд (основной рабочий код)
│  ├─ src/
│  │  ├─ app/                  # App Router: страницы и layout
│  │  │  ├─ __tests__/         # Jest+RTL тесты страниц + снапшоты
│  │  │  ├─ checkout/page.tsx
│  │  │  ├─ contacts/page.tsx
│  │  │  ├─ shop/page.tsx
│  │  │  ├─ layout.tsx         # Root layout, подключает Provider (Chakra)
│  │  │  └─ page.tsx           # Главная страница ("/")
│  │  ├─ components/
│  │  │  ├─ Header/, Footer/   # Общий header/footer сайта
│  │  │  ├─ PromoBanner/       # Сезонные промо-баннеры + countdown-таймер
│  │  │  └─ Provider/          # ChakraProvider + тема
│  │  └─ data/
│  │     └─ promoBanners.ts    # Конфиг активных промо-баннеров
│  ├─ configs/jest/             # Jest setup (matchMedia mock и т.п.)
│  ├─ public/images/sale/...    # Картинки для промо-баннеров (webp)
│  └─ package.json
├─ server/                     # Express backend (только каркас)
│  ├─ src/
│  │  ├─ app.ts                # express() + middlewares + healthcheck
│  │  ├─ index.ts              # entrypoint, app.listen()
│  │  └─ middlewares/notFound.ts
│  └─ package.json
└─ jwshopdoc/                  # эта документация
```

`client` и `server` — два независимых npm-пакета. Общего workspace/lerna/turbo
конфига нет, зависимости не шарятся, версии TypeScript в них разные.

## Стек технологий

### Client
- **Next.js 15** (App Router, Turbopack для dev/build)
- **React 19**
- **Chakra UI 2** (+ `@emotion/react`, `@emotion/styled`, `framer-motion` как
  peer-зависимости Chakra) — вся стилизация через Chakra, отдельного
  CSS-фреймворка (Tailwind и т. п.) нет
- **TypeScript 5** (strict mode)
- **Jest 30 + ts-jest + @testing-library/react** — тестирование
- **ESLint 9 (flat config)** на базе `next/core-web-vitals` + Prettier

### Server
- **Express 4** + TypeScript
- **cors**, **morgan** (логирование запросов), **dotenv**
- **zod** и **uuid** — присутствуют в зависимостях, но нигде в коде пока не
  используются (заготовка на будущее для валидации и генерации id)
- **ts-node-dev** для dev-режима с авто-рестартом
- ESLint 9 flat config + `typescript-eslint` + `eslint-plugin-perfectionist`
  (сортировка импортов/членов) + Prettier

## Как связаны client и server

**Никак — на данный момент.** Client не делает HTTP-запросов к серверу: все
данные (список товаров, содержимое корзины, категории) — это литералы,
захардкоженные прямо в `page.tsx`-файлах. `server` поднимает Express-приложение
с единственным работающим маршрутом `GET /health`, всё остальное API,
описанное в `server/README.md`, не реализовано (см. [SERVER.md](./SERVER.md)).

Порты по умолчанию:
- client (Next.js dev): `3000`
- server (Express): `4000` (переменная окружения `PORT`, файла `.env` в
  репозитории нет — `dotenv.config()` вызывается, но `.env.example` отсутствует,
  хотя упомянут в `server/README.md`)

## Роутинг клиента (App Router)

| URL | Файл |
|---|---|
| `/` | `client/src/app/page.tsx` |
| `/shop` | `client/src/app/shop/page.tsx` |
| `/checkout` | `client/src/app/checkout/page.tsx` |
| `/contacts` | `client/src/app/contacts/page.tsx` |

В навигации `Header.tsx` также есть ссылки на `/about`, `/blog`, `/features` —
страниц для них **не существует**, переход по ним приведёт к 404 (Next.js).

## Import alias

В `client/tsconfig.json` настроен `@/*` → `./src/*`. Используется повсеместно:
`@/components/...`, `@/data/promoBanners`.
