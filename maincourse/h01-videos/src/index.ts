// src/index.ts
import express, {Request, Response} from "express";
import cors from "cors";
import {getAllVideos, postVideo} from "./repositories/videos.repository";
import {FieldError, ReqWithBody} from "./types";
import {GetAllVideosOut} from "./models/GetAllVideosOut";
import {PostVideoOut} from "./models/PostVideoOut";
import {CreateVideoInput} from "./models/CreateVideoInput";

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

app.get("/", (_req: Request, res: Response<{ message: string }>) => {
    res.status(HTTP.OK).json({message: "Projects API for videos is up"});
});

app.get('/videos', (_req: Request<GetAllVideosOut>, res: Response) => {
    const videos = getAllVideos();
    res.status(HTTP.OK).json(videos);
})

app.post('/videos', (req: ReqWithBody<CreateVideoInput>, res: Response<PostVideoOut>) => {
    const errorsMessages: FieldError[] = []

    const validResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'] as const;
    const {title, author, availableResolutions} = req.body;
    if (title.length > 40 || title.length === 0) {
        errorsMessages.push({
            message: 'Field required and maxLength: 40',
            field: 'title',
        });
    }
    if (author.length > 20 || author.length === 0) {
        errorsMessages.push({
            message: 'Field required and maxLength: 20',
            field: 'author',
        });
    }
    let isAvailableResolutionsValid = availableResolutions.length && Array.isArray(availableResolutions)
    if (isAvailableResolutionsValid) {
        availableResolutions.forEach(r => {
            if (!validResolutions.includes(r)) {
                isAvailableResolutionsValid = false
            }
        })
    }
    if (!isAvailableResolutionsValid) {
        errorsMessages.push({
            message: 'Check availableResolutions',
            field: 'availableResolutions',
        });
    }
    if (errorsMessages.length > 0) {
        res.status(HTTP.BAD_REQUEST).json({errorsMessages});
        return
    }

    const newVideo = postVideo({...req.body});
    if (newVideo) {
        res.status(HTTP.CREATED).json(newVideo);
    }
})

app.listen(port, () => console.log(`✅ http://localhost:${port}`));