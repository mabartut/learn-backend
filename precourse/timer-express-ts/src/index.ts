import express from "express";
import {Request, Response} from 'express';
import cors from "cors";
import {
    getAllTimes,
    saveCurrentTime,
    // deleteTimeById,
    // updateTimeById,
} from "./repositories/timer.repository";

const app = express();
const port = Number(process.env.PORT) || 3000;

// мидлвары
app.use(express.json()); // парсим JSON-тело

// Разрешить для все делать запросы с любых доменов (подходит для локалки)
app.use(cors());

// GET /timer  (+ опционально ?from=&to=)
app.get("/timer", async (req: Request, res: Response) => {
    //опционально
    const {from, to} = req.query as { from?: string; to?: string };

    const rows = await getAllTimes({from, to});
    res.status(200).json(rows);
});

// POST /timer/save
app.post("/timer/save", async (_req: Request, res: Response) => {
    const row = await saveCurrentTime();
    res.status(201).json(row);
});

// TODO: DELETE /timer/:id  — реализуй сам
// app.delete("/timer/:id", async (req, res) => { ... });

// TODO: PUT /timer/:id?saved_at=<ISO>  — реализуй сам
// app.put("/timer/:id", async (req, res) => { ... });


app.listen(port, () => console.log(`✅ http://localhost:${port}`));