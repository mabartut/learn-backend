const http = require('http')
const fs = require('fs')

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
            console.log('ПРОМИС зарезолвился')
        }, ms)
    })
}

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
            console.log('файл прочитан')
        })
    })
}

const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case '/home': {
            console.log('Home page');
            try {
                const data = await readFile('./pages/home2.html')
                res.write(data)
                console.log('try');

            } catch (err) {
                res.write('error')
                console.log('error');
            }
            res.end()
            break
        }
        case '/about': {
            console.log('about page start');
            await delay(3000)
            res.write('about page')
            res.end()
            console.log('about page finish1');
            break
        }
        default:
            res.write('NOT FOUND')
            res.end()
    }
})

server.listen(3003)