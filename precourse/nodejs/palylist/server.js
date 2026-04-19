const http = require('http')
const fs = require('fs')

let requestCounter = 0

console.log('server started', requestCounter)

const server = http.createServer((req, res) => {

    console.log(`URL: ${req.url}, Counter before: ${requestCounter}`) // ← ДОБАВЬТЕ

    // Игнорируем favicon и запросы Chrome DevTools
    if (req.url !== '/favicon.ico' && !req.url.includes('.well-known')) {
        requestCounter++
        console.log(`Request #${requestCounter}: ${req.url}`)
    } else {
        console.log(`Ignored: ${req.url}`)
    }

    switch (req.url) {
        case '/students':
            res.write('STUDENTS')
            break
        case '/':
        case '/courses':
            res.write('COURSES')
            break
        case '/favicon.ico':
            try {
                const favicon = fs.readFileSync('./favicon.ico')
                res.writeHead(200, {'Content-Type': 'image/x-icon'})
                res.end(favicon)
            } catch (err) {
                res.writeHead(404)
                res.end()
            }
            return
        default:
            res.write('NOT FOUND')
    }

    res.write(' requestCounter' + requestCounter)

     res.end()
})

server.listen(3003)