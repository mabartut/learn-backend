// Вопрос1:
//     Верни JSON {"status":"ok"}. Укажи корректный Content-Type.
//     Подсказка: javascript объект можно преобразовать в JSON с помощью утилиты JSON.stringify
//
// // внутри обработчика:
// res.writeHead(200, { 'Content-Type': XXX });
// res.end(YYY);
// Твой ответ:
//     'application/json' JSON.stringify({"status": "ok"})

// совпадает с ИИ
//
//
// /////////////////////////
// Вопрос6:
//     Верни 405 Method Not Allowed, если метод не GET
//
// if (req.method === XXX) {
//     res.end('ok');
// } else {
//     YYY
//     res.end('Method Not Allowed');
// }
// // Твой ответ:
// //     'GET' res.writeHead(405, {'Content-Type': 'text/plain'})
//
// а надо видимо
// 'GET' res.statusCode = 405;
