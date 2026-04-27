import {parse} from 'url'
import {getAllTimes, saveCurrentTime, deleteTimeById, updateTimeById} from './repositories/timer.repository.js'

export async function router(req, res) {
    const url = parse(req.url || '', true);
    const method = req.method;
    const dateValidation = (str)=>{
        const date = new Date(str)
        let isDateValid = false

        if (!Number.isNaN(date.getTime())) {
            isDateValid = date.toISOString() === str
        }
        return isDateValid
    }

    if (url.pathname === '/timer' && method === 'GET') {
        const from = dateValidation( url.query.from) ? url.query.from : undefined ;
        const to = dateValidation( url.query.to) ? url.query.to : undefined ;
        const times = await getAllTimes(from, to);

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

        let isDateValid = dateValidation(saved_at)

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


