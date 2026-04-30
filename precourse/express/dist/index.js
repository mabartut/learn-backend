"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Подключаем Express.
//Request и Response — TS-типы для подсказок и проверки корректности в хендлерах. В рантайме их нет — это только для разработки.
const express_1 = __importDefault(require("express"));
//Создаём приложение Express — главный объект сервера.
//Через app вы:
//регистрируете middleware (app.use(...)),
//объявляете роуты (app.get/post/...),
//запускаете сервер (app.listen(...)).
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
//Регистрируем глобальный middleware для парсинга JSON-тел запросов.
//После этого req.body уже содержит объект, если клиент прислал Content-Type: application/json.
//Важно: порядок имеет значение — use должен быть до роутов.
app.use(express_1.default.json());
//Роут-хендлер для метода GET и пути /health.
app.get('/health', (req, res) => {
    //явно ставим HTTP-статус 200 и отправляем JSON (Express сам проставит Content-Type: application/json).
    //можно использовать .send(...); вместо json
    res.status(200).json({ status: 'ok' });
});
//Роут-хендлер для POST /echo.
//Благодаря express.json() вверху, тут уже можно читать req.body.
app.post('/echo', (req, res) => {
    //вернули в теле то что пришло от клиента.
    res.status(201).json({ youSent: req.body });
});
//Запускаем HTTP-сервер и начинаем слушать порт.
app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map