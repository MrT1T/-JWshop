# Подсистема промо-баннеров

Каталог: `client/src/components/PromoBanner/`. Самая нетривиальная логика во
всём клиенте — управляет тем, какой сезонный баннер показывается наверху
каждой страницы, и отрисовывает обратный отсчёт до конца акции.

## Структура

```
PromoBanner/
├─ index.tsx                        # экспорт DefaultPromoBanner + PromoBannerManager
├─ PromoBannerManager.tsx           # выбирает, какой баннер показать
├─ Promos/
│  ├─ DefaultPromoBanner.tsx        # баннер без картинки (фон purple.700)
│  ├─ WinterSale.tsx                # фон winterSale/*.webp
│  ├─ ValentinesDay.tsx             # фон valentinesDay/*.webp
│  ├─ SpringSale.tsx                # фон springSale/*.webp
│  └─ Components/DiscountSticker.tsx # круглый "SAVE UP TO X%" стикер
├─ hooks/useCountdown.ts            # хук обратного отсчёта
└─ utils/
   ├─ calculateDurationTimeUnits.ts # ms → {days, hours, minutes, seconds}
   ├─ formatNumberToDwoDigits.ts    # 5 → "05" (опечатка в имени файла, "Dwo" вместо "Two" — так и используется в коде, не переименовывать без причины)
   └─ index.ts                     # барель
```

## Как выбирается активный баннер

Конфигурация — единственный источник правды: `client/src/data/promoBanners.ts`.
Это массив `PromoBannerConfig`:

```ts
interface PromoBannerConfig {
  id: string;
  component: React.FC;
  priority: number;      // меньше = выше приоритет (сортировка по возрастанию)
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}
```

`PromoBannerManager.tsx`:
1. Фильтрует баннеры по `isActive: true`.
2. Сортирует по `priority` (по возрастанию — значит `1` показывается раньше `99`).
3. Берёт первый элемент.
4. Если у него заданы `startDate`/`endDate` — проверяет, что `now` попадает в
   диапазон, иначе ничего не рендерит.
5. Рендерит `<activeBanner.component />`.

**Чтобы включить/выключить/сменить акцию — правится только
`data/promoBanners.ts`** (поле `isActive` нужного баннера), сами компоненты
баннеров трогать не нужно.

На момент написания документации активен `winter-sale` (`isActive: true`),
остальные (`free-shipping`, `valentines-day`, `spring-sale`) выключены.

`PromoBannerManager` вызывается на **каждой** странице (`/`, `/shop`,
`/checkout`, `/contacts`) в начале JSX — при добавлении новой страницы её тоже
нужно подключать вручную.

## Countdown-таймер

`useCountdown(targetDate: Date)`:
- Считает `targetDate.getTime() - now.getTime()` при монтировании.
- Каждую секунду (`setInterval`, 1000ms) пересчитывает разницу, останавливается
  на 0.
- Возвращает `calculateDurationTimeUnits(ms)` → `{ days, hours, minutes, seconds }`.
- Каждый баннер сам передаёт `targetDate` (сейчас — `useMemo(() => new
  Date(Date.now() + 90000000), [])`, т.е. фиксированные ~25 часов от момента
  рендера, не привязано к `promoBanners.ts`). Если нужно, чтобы обратный отсчёт
  шёл до реальной даты конца акции — это надо явно прокинуть из `endDate`
  конфига, сейчас это не связано.

`formatNumberToDwoDigits(n)` — паддинг до двух цифр (`5 → "05"`), используется
для часов/минут/секунд в UI.

## Как добавить новый сезонный баннер

1. Создать `Promos/<Name>.tsx` по образцу `WinterSale.tsx`/`SpringSale.tsx`
   (используют `useCountdown` + `DiscountSticker` + фон `bgImage` с
   `{ base: mobile, md: default }`).
2. Положить картинки в `public/images/sale/<name>/{default,mobile}.webp`.
3. Добавить запись в `promoBanners` (`data/promoBanners.ts`) с уникальным `id`,
   `priority`, `isActive`.
4. При необходимости — снапшот-тесты страниц (`Home.test.tsx` и т. п.) мокают
   `useCountdown`, так что смена активного баннера может потребовать
   обновления снапшотов (`npm run test:update`), если меняется текст/структура
   баннера на странице.
