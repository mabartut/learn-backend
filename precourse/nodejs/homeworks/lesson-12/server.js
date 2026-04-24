const fs = require('fs');
const http = require('http');

const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const delay = (ms)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,ms)
    })
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');


    if (req.url === '/') {
        res.write('index.html');
    }
    if (req.url === '/home') {
        try {
            await delay(Math.floor(Math.random() * 1001 + 1000));
            const data = await readFilePromise('./home.html');
            res.write(data);

        } catch (err) {
            res.statusCode = 500;
            res.end('Ошибка сервера');
        }
    }
    if (req.url === '/about') {
        try {
            await delay(Math.floor(Math.random() * 1001 + 1000));
            const data = await readFilePromise('./about.html');
            res.write(data);

        } catch (err) {
            res.statusCode = 500;
            res.end('Ошибка сервера');
        }
    }
    res.end();
})

server.listen(3000, () => {
    console.log(`Server started on port 3000`);
})
