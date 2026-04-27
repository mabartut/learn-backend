import {parse} from 'url'
import {getAllTimes, saveCurrentTime, deleteTimeById, updateTimeById} from './repositories/timer.repository.js'

export async function router(req, res) {
    const url = parse(req.url || '', true);
    const method = req.method;
    const pathname = url.pathname;
    const query = url.query;

    console.clear()
    console.log('method=', method)
    console.log('pathname=', pathname)
    console.log('url=', url)


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
        console.log('Попытка обновить')
        console.log(url.searchParams);

         const id = url.pathname.split('/')[2];
         const newTimestamp = url.query.saved_at;

        console.log('id=', id)
        console.log('newTimestamp=', newTimestamp)

        await updateTimeById(id,newTimestamp);
        //
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: `Обновлено для ID ${id}`}));
        return;
    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
}


