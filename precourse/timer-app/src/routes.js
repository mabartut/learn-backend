import {parse} from 'url'
import {getAllTimes, saveCurrentTime, deleteTimeById, updateTimeById} from './repositories/timer.repository.js'

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

    if (url.pathname?.startsWith('/timer/') && method === 'PUT') {
        const id = url.pathname.split('/')[2];
        const saved_at = url.query.saved_at;

        if (isNaN(+id) || id < 1) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: "Invalid timer ID"}));
            return;
        }

        const date = new Date(saved_at)
        let isDateValid = false

        if (!Number.isNaN(date.getTime())) {
            isDateValid = date.toISOString() === saved_at
        }

        if (isDateValid) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            const result = await updateTimeById(id, saved_at);
            res.end(JSON.stringify(result));
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: "Invalid saved_at format"}));
        }

        return;
    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
}


