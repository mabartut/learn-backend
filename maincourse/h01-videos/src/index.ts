// src/index.ts
import express, {Request, Response} from "express";
import cors from "cors";

export const app = express();
const port = Number(process.env.PORT) || 3000;

export const HTTP = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
} as const;

app.use(express.json());
app.use(cors());

// Пинг
app.get("/", (_req: Request, res: Response<{ message: string }>) => {
    res.status(HTTP.OK).json({message: "Projects API for videos is up"});
});

app.listen(port, () => console.log(`✅ http://localhost:${port}`));