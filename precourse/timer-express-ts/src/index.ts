import express from "express";
import {Request, Response} from 'express';
import cors from "cors";
import {
    saveCurrentTime,
    getAllTimes,
    deleteTimeById,
    updateTimeById,
} from "./repositories/timer.repository";

const app = express();
const port = Number(process.env.PORT) || 3000;

// мидлвары
app.use(express.json()); // парсим JSON-тело

// Разрешить для все делать запросы с любых доменов (подходит для локалки)
app.use(cors());

app.get("/timer", async (req: Request, res: Response) => {
    const {from, to} = req.query as { from?: string; to?: string };

    const rows = await getAllTimes({from, to});
    res.status(200).json(rows);
});

app.post("/timer/save", async (_req: Request, res: Response) => {
    const row = await saveCurrentTime();
    res.status(201).json(row);
});

app.delete("/timer/:id", async (req: Request, res: Response) => {
    const row = await deleteTimeById(+req.params.id);
    res.status(200).json(row);
})

app.put("/timer/:id", async (req: Request, res: Response) => {
    const query = req.query as { saved_at: string };
    console.log('query=', query)
    const row = await updateTimeById(+req.params.id, query.saved_at);
    res.status(200).json(row);
});

app.listen(port, () => console.log(`✅ http://localhost:${port}`));