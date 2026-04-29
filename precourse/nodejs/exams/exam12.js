// Вопрос1:
//
//     Отправь JSON с правильным Content-Type
//
// const result = {status: 'Ok'};
// res.writeHead(200, { 'Content-Type': XXX });
// res.end(YYY);
// Твой ответ:
////     'application/json' JSON.stringify({"status": "Ok"}
//ИИ 'application/json' JSON.stringify(result)
//
// Вопрос2:
//
//     Обработай ошибку чтения файла и верни подходящий статус.
//
//     import http from 'http';
// import fs from 'fs';
//
// const server = http.createServer((req, res) => {
//     if (req.method === 'GET' && req.url === '/page') {
//         XXX {
//             const html = fs.readFileSync('index.html', 'utf-8');
//             res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//             res.end(html);
//         } YYY (error) {
//             console.error(error);
//             res.writeHead(ZZZ);
//             res.end('Internal Server Error');
//         }
//         return;
//     }
//
//     res.writeHead(404);
//     res.end('Not found');
// });
//
// server.listen(3000);
//
// Твой ответ:
//     try catch
//// а надо видимо
// // 500 try catch
//
// Вопрос8:
//
//     Верни ошибку клиента и JSON {"error":"Bad Request"}
// res.writeHead(XXX, { 'Content-Type': 'application/json' });
// res.end(YYY);
// Твой ответ:
//
//     500 JSON.stringify({"error":"Bad Request"})
// а надо видимо
// 400 JSON.stringify({"error":"Bad Request"})