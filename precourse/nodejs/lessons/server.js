import http from 'http'

const server = http.createServer((req, res) => {
    console.log(`[${req.method}]/${req.url} at ${new Date().toISOString().slice(0, 10)}`)

    if (req.url === '/log') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(`
        <script>
            console.log('Сообщение из сервера в консоль браузера!');
            console.log('Текущая дата:', new Date().toISOString().slice(0, 10));
        </script>
        <h1>Проверьте консоль (F12)</h1>
    `)
        return
    }
    if (req.url === '/hello' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Hello!')
        return
    }
    if (req.url === '/bye') {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Goodbye')
        return
    }

    res.writeHead(404);
    res.end('Not Found!')

})

server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
})