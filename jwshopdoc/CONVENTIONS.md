# Конвенции и стиль кода

## Prettier

Одинаковый `.prettierrc` в обоих пакетах:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "endOfLine": "auto"
}
```

Точка с запятой обязательна, кавычки одинарные, висячая запятая — везде
(`all`), включая последний аргумент функции.

## ESLint

Оба пакета используют **flat config** (`eslint.config.mjs`, ESLint 9), но
конфиги разные:

- **client**: `next/core-web-vitals` + `next/typescript` (через
  `FlatCompat`) + `eslint-plugin-react` + `eslint-plugin-prettier`.
  `react/react-in-jsx-scope` выключен (React 19 + новый JSX transform, `import
  React` не обязателен, хотя в коде он почти везде оставлен по привычке).
  Игнор: `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`.
- **server**: `@typescript-eslint` + **`eslint-plugin-perfectionist`**
  (`recommended-natural` — навязывает сортировку импортов, членов интерфейсов
  и т.п. в "естественном" алфавитном порядке) + `eslint-plugin-prettier`.
  Игнор: `node_modules`, `out`, `build`.

`prettier/prettier` в обоих — уровень `warn`, не `error`.

Команды:
```bash
cd client && npm run lint   # eslint src --fix — реально работает
cd server && npm run lint   # echo "No linter configured" — НЕ настоящий линт!
```
Для сервера, если нужно реально пролинтить — `npx eslint src` напрямую (см.
[SERVER.md](./SERVER.md)).

## TypeScript

- **client**: `target: ESNext`, `strict: true`, `moduleResolution: bundler`,
  `jsx: preserve`, alias `@/*` → `./src/*`, `noEmit: true` (сборку делает
  Next.js, не `tsc`).
- **server**: `target: ES2020`, `module: CommonJS`, `strict: true`, но
  `noImplicitAny: false` (единственное послабление strict-режима — неявный
  `any` разрешён), `rootDir: src` → `outDir: dist`.

Оба — `strict: true` в остальном, так что новый код должен быть полностью
типизирован (кроме неявного `any` на сервере, которое явно разрешено).

## Именование и структура компонентов (client)

- Каждый нетривиальный компонент — своя папка с `ComponentName.tsx` +
  `index.ts(x)`, который делает `export { default } from './ComponentName'`.
  Импортировать компонент нужно из папки (`@/components/Header`), а не из
  файла (`@/components/Header/Header`).
- Клиентские компоненты со стейтом/эффектами/`usePathname` и т.п. помечены
  директивой `'use client'` первой строкой файла.
- Стили — только пропсами Chakra UI (`bg`, `sx`, `_hover`, breakpoint-объекты
  `{ base, md, lg, ... }`), отдельные CSS-модули не заводятся.
- Утилитарные функции/хуки — в подпапках `utils/`, `hooks/` рядом с
  компонентом, который их использует (см. `PromoBanner/utils`,
  `PromoBanner/hooks`), с барелем `utils/index.ts`, реэкспортирующим все
  функции.

## Git / коммиты

Судя по истории (`git log`), принят стиль:
```
feature(<Область>) <краткое описание в свободной форме>
fix(<Область>) <описание>
```
Например: `feature(SpringSale) added promo`, `fix(DefaultPromoBanner) updated
styles`, `feature(Checkout) added tests`. `<Область>` — обычно имя компонента
или страницы, к которой относится изменение. Строгого списка типов (как в
conventional commits: feat/fix/chore/docs) не соблюдается — использовались
только `feature` и `fix`.

## Общие рекомендации для агентов при правке кода

1. Не смешивать конвенции client и server — это разные ESLint-конфиги и разные
   версии TypeScript-настроек.
2. Импортировать компоненты через барели (`index.ts`), а не напрямую из файла
   реализации.
3. После изменения текста/верстки страниц — обновлять снапшот-тесты (см.
   [TESTING.md](./TESTING.md)).
4. Не полагаться на `server/README.md` как на текущее состояние API — сверяться
   с [SERVER.md](./SERVER.md).
