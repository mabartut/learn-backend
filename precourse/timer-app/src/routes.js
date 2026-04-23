import {parse} from 'url'
import {getAllTimes, saveCurrentTime, deleteTimeById} from './repositories/timer.repository.js'

export async function router(req, res) {
    const url = parse(req.url || '', true);
    const method = req.method;

    if (url.pathname === '/timer' && method === 'GET') {
        const times = await getAllTimes();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(times));
        return;
    }

    if (url.pathname === '/timer/save' && method === 'POST') {
        const time = await saveCurrentTime();

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(time));
        return;
    }

    if (url.pathname?.startsWith('/timer/') && method === 'DELETE') {
        const id = url.pathname.split('/')[2];
        await deleteTimeById(id);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: `Deleted time with ID ${id}`}));
        return;
    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
}


