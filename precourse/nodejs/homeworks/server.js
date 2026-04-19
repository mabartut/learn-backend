import http from 'http'

const users = [
    {id: 1, name: "Alice", age: 25},
    {id: 2, name: "Bob", age: 30},
    {id: 3, name: "Charlie", age: 22}
];

const stats = {
    totalRequests: 0,
    routes: {
        "/hello": 0,
        "/users": 0,
        "/about": 0
    }
}

const server = http.createServer((req, res) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toISOString()}`)

    stats.totalRequests = stats.routes["/hello"] + stats.routes["/users"] + stats.routes["/about"]

    if (req.url === '/users' && req.method === 'GET') {
        stats.routes["/users"] = stats.routes["/users"] + 1

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users));
        return
    }

    if (req.url.startsWith('/users/') && req.method === 'GET') {
        stats.routes["/users"]++
        const id = +req.url.split('/')[2]
        const user = users.find(u => u.id === id)

        if (user) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user))
            return
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('User Not Found!')
            return
        }
    }

    if (req.url === '/stats' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(stats));
        return
    }

    if (req.url === '/hello') {
        stats.routes["/hello"] = stats.routes["/hello"] + 1
        res.end('Hello from my server!!')
        return
    }
    if (req.url === '/time') {
        res.end(`Current time is: ${new Date().toISOString().slice(11, 16)}`)
        return
    }
    if (req.url === '/about') {
        stats.routes["/about"] = stats.routes["/about"] + 1
        res.end('My name is Artem, I study Back-end.')
        return
    }

    res.writeHead(404);
    res.end('Page not found')
})

server.listen(4000, () => {
    console.log('Сервер запущен на http://localhost:3000');
})