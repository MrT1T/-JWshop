# Client (Next.js)

Каталог: `client/`. Точка входа для агента — эта директория для любых задач,
связанных с UI, страницами, компонентами и клиентскими тестами.

## Запуск

```bash
cd client
npm install
npm run dev     # next dev --turbopack, http://localhost:3000
npm run build   # next build --turbopack
npm run start   # прод-сервер после build
npm run lint    # eslint src --fix
npm run test    # jest
npm run test:update  # jest --updateSnapshot — обновить снапшоты
```

## Страницы (`src/app/`)

Все страницы — клиентские компоненты (`'use client'`), у всех одинаковый
верхнеуровневый каркас: `<PromoBannerManager /> <Header /> ...контент... <Footer />`.

- **`page.tsx` (`/`)** — лендинг: Hero, блок "Ideal Has Never Been Closer"
  (SplitSection), Bestsellers (4 товара с моковыми ценами), второй SplitSection
  ("Swiss Essence"), Journal (блог-превью, 3 карточки-заглушки).
- **`shop/page.tsx` (`/shop`)** — каталог: поиск (`useState`, фильтрация не
  реализована — только хранит строку), сортировка (`<Select>`, без реальной
  логики сортировки), категории-фильтры (`activeCategory` состояние, тоже не
  фильтрует список), сетка из 8 моковых товаров с `via.placeholder.com`
  картинками.
- **`checkout/page.tsx` (`/checkout`)** — форма биллинга (не сабмитится никуда)
  + сводка заказа с 3 захардкоженными позициями корзины (`useState` без
  сеттера, т.е. корзину нельзя изменить), подсчёт `subtotal`/`total` на лету,
  выбор способа оплаты — чисто визуальный (не влияет на состояние).
- **`contacts/page.tsx` (`/contacts`)** — контактная информация (адрес,
  телефон, часы работы) + форма обратной связи (без обработчика submit).

Ни одна форма на сайте не имеет реального `onSubmit`/API-вызова — весь ввод
находится в статических JSX-полях либо контролируется локальным `useState` без
персистентности.

## Компоненты (`src/components/`)

- **`Header/Header.tsx`** — навигация сайта: логотип, ссылки (Home/About/Blog/
  Features/Contacts/Shop через `next/link`, подсветка активного пункта по
  `usePathname()`), иконки избранного/пользователя, иконка корзины со
  статичным счётчиком `3` (ведёт на `/checkout`), гамбургер-меню для мобилы
  (без реального выпадающего меню — иконка есть, поведения нет).
- **`Footer/Footer.tsx`** — лого, список ссылок (не ведут никуда — `<Link>` без
  `href`), форма подписки на рассылку (без отправки), copyright и ссылки на
  Privacy/Terms.
- **`Provider/Provider.tsx`** — `ChakraProvider` с кастомной темой
  (`extendTheme`): шрифт Inter для heading/body, фон body — `white`. Подключён
  один раз в `app/layout.tsx`, оборачивает всё приложение.
- **`PromoBanner/`** — см. отдельный документ [PROMO_BANNERS.md](./PROMO_BANNERS.md).

### Барели (index.ts)

`Header`, `Footer`, `Provider` и `PromoBanner` экспортируются через
`index.ts`/`index.tsx` (re-export паттерн), импортировать нужно из папки, а не
из конкретного файла компонента, например:
```ts
import Header from '@/components/Header';   // не '@/components/Header/Header'
```

## Стилизация

Только Chakra UI — пропсы вида `bg`, `sx`, `_hover`, брейкпоинты
`{ base: ..., md: ... }`. Отдельных `.module.css` почти нет (кроме
неиспользуемого `page.module.css`, оставшегося от шаблона create-next-app —
`page.tsx` его не импортирует). Глобальные стили — `src/app/globals.css`,
подключены в `layout.tsx`.

## Assets

`public/images/sale/{winterSale,valentinesDay,springSale}/{default,mobile}.webp`
— фоновые картинки промо-баннеров, отдельно для десктопа и мобилы.
Остальные SVG в `public/` (`file.svg`, `globe.svg`, ...) — неиспользуемые
остатки шаблона create-next-app.
