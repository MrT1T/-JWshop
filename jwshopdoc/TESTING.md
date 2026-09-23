# Тестирование

Тесты есть только в `client/` (в `server/` тестов нет вообще).

## Стек

- **Jest 30** через `next/jest` (`nextJest({ dir: './' })` в `jest.config.ts`)
  — это даёт автоматическую поддержку Next.js-конфига, алиасов и CSS-модулей.
- **ts-jest** как трансформер (`preset: 'ts-jest'`, `transform` для `.ts/.tsx`).
- **jsdom** окружение (`testEnvironment: 'jsdom'`).
- **@testing-library/react**, **@testing-library/user-event**,
  **@testing-library/jest-dom**.
- Setup-файл: `client/configs/jest/jest.setup.ts` — импортирует
  `@testing-library/jest-dom` и мокает `window.matchMedia` (нужно для Chakra UI,
  которая обращается к нему при SSR/JSDOM-рендере).

## Расположение

`client/src/app/__tests__/*.test.tsx` — по одному файлу на страницу:
`Home.test.tsx`, `Shop.test.tsx`, `Checkout.test.tsx`, `Contacts.test.tsx`.
Снапшоты — `__tests__/__snapshots__/*.test.tsx.snap`.

Тестов на отдельные компоненты (`Header`, `Footer`, `PromoBanner/*`) или
хуки/утилиты (`useCountdown`, `calculateDurationTimeUnits`, ...) **пока нет** —
покрыты только страницы целиком, через рендер `page.tsx`.

## Общий паттерн (одинаковый во всех 4 файлах)

```tsx
jest.mock('../../components/PromoBanner/hooks/useCountdown', () => ({
  useCountdown: () => ({ hours: 1, minutes: 30, seconds: 45 }),
}));

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe('X component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithChakra(<X />);
    expect(asFragment()).toMatchSnapshot();
  });
  // ...точечные проверки конкретных секций/элементов
});
```

Важные детали:
- `useCountdown` **всегда мокается** фиксированными значениями — иначе
  снапшоты были бы недетерминированными (реальный таймер тикает раз в секунду).
  При добавлении нового теста, рендерящего любую страницу (все страницы
  подключают `PromoBannerManager`), этот мок обязателен.
- Каждая страница оборачивается в "голый" `<ChakraProvider>` (без кастомной
  темы из `components/Provider`) — этого достаточно, т.к. тема влияет только на
  визуальные токены, не на структуру DOM/текст.
- `Home.test.tsx` использует хелпер `getScopedByHeading(text)` — находит
  заголовок и берёт `within(closest('section') ?? parentElement)`, чтобы
  проверять содержимое конкретной секции лендинга, а не всей страницы разом
  (важно, т.к. на странице несколько одинаковых кнопок "Learn More"/"View").

## Команды

```bash
cd client
npm run test           # разовый прогон
npm run test:update    # jest --updateSnapshot
```

## Когда обязательно обновлять снапшоты

Любое изменение текста, структуры DOM или порядка элементов на странице
`/`, `/shop`, `/checkout`, `/contacts` (включая изменения в `Header`, `Footer`,
активном промо-баннере — т.к. они рендерятся на каждой странице) ломает
существующий снапшот. Перед коммитом — `npm run test`, если упал только
snapshot-тест и новая верстка ожидаема, `npm run test:update`, затем
внимательно просмотреть diff в `.snap`-файле перед коммитом (снапшот — это не
авто-сгенерированный шум, а часть ревью).
