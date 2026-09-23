# Server (Express)

Каталог: `server/`. **Важно:** это каркас, не рабочее API. Читать этот
документ перед тем, как опираться на `server/README.md` — README описывает
задуманную структуру, часть которой ещё не реализована.

## Реальное состояние кода

```
server/src/
├─ app.ts                  # express-приложение целиком
├─ index.ts                # entrypoint: dotenv.config() + app.listen()
└─ middlewares/
   └─ notFound.ts          # 404-хендлер
```

Это всё. Директорий `routes/`, `controllers/`, `services/`, `models/`,
`utils/`, а также файла `.env.example`, упомянутых в `server/README.md`, **в
репозитории нет**.

### `app.ts`

```ts
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// app.use("/api", routes);   <-- закомментировано, роутов нет

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use(notFound);            // ловит всё, что не /health

// app.use(errorHandler);     <-- закомментировано, errorHandler.ts не существует
```

Единственный рабочий endpoint — **`GET /health`** → `{ status: 'ok', uptime }`.
Любой другой путь возвращает 404 с телом
`{ error: 'Not Found', message: 'Route <path> not found' }` (см.
`middlewares/notFound.ts`).

### `index.ts`

```ts
dotenv.config();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
```

`.env` в репозитории нет (в `.gitignore` есть `.env*`), а `.env.example`, на
который ссылается README, не создан — если он нужен, его придётся создать
заново.

## Что заявлено в `server/README.md`, но не реализовано

- CRUD для товаров: `GET/POST/PATCH/DELETE /api/products[...]`
- Пользователи: `GET/POST /api/users`
- Заказы: `GET/POST /api/orders` (с проверкой стока)
- Валидация через **zod** — пакет установлен (`zod` в `dependencies`), но нигде
  не импортируется
- Генерация id через **uuid** — тоже установлен, но не используется
- Хранение данных в JSON-файлах — соответствующих файлов/утилит нет

Если задача — "реализовать API магазина", ориентироваться нужно на этот список
как на техзадание, а не как на существующий код.

## Скрипты

```bash
cd server
npm install
npm run dev     # ts-node-dev --respawn --transpile-only src/index.ts
npm run build   # tsc → dist/
npm run start   # node dist/index.js (после build)
npm run lint     # заглушка: echo "No linter configured" — реальный lint через eslint.config.mjs надо запускать как `npx eslint src`
```

Обратите внимание: `npm run lint` в `package.json` — это просто `echo`, не
настоящая проверка, хотя `eslint.config.mjs` в проекте есть и рабочий
(TypeScript + `eslint-plugin-perfectionist` + Prettier). Чтобы реально
пролинтить сервер, нужно вызывать eslint напрямую (`npx eslint src`), а не
`npm run lint`.

## Связь с клиентом

Отсутствует. Клиент не делает fetch/axios-запросов к `server` ни на одной
странице — см. [ARCHITECTURE.md](./ARCHITECTURE.md) и [CLIENT.md](./CLIENT.md).
Если задача — "подключить клиент к серверу", начинать нужно с реализации хотя
бы одного реального роута на сервере (например, `/api/products`), а затем
заменять моковые массивы в `client/src/app/**/page.tsx` на запросы к нему.
