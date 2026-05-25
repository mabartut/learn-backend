// src/index.ts
import express, {Request, Response} from "express";
import cors from "cors";
import {
    createProject,
    deleteProject,
    getProjectById,
    listProjects,
    NewProjectInput,
    ProjectRowDb,
    updateProject,
    UpdateProjectInput,
} from "./repositories/projects.repository";
import {
    createTask,
    deleteTask,
    getProjectTasks,
    getProjectWithTasks2,
    NewTaskInput,
    ProjectWithTasks,
    TaskRowDb,
    updateTask,
    UpdateTaskInput
} from "./repositories/project-with-tasks.repository";

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
    res.status(HTTP.OK).json({message: "Projects API is up"});
});

// GET /projects?name=...
app.get("/projects", async (req: Request<{}, {}, {}, {
    name: string,
    status: string
}>, res: Response<ProjectRowDb[]>) => {
    const {name, status} = req.query;
    const rows = await listProjects({name, status});
    res.status(HTTP.OK).json(rows);
});

// GET /projects/:id
app.get("/projects/:id", async (req: Request<{ id: string }>, res: Response<ProjectRowDb | { error: string }>) => {
    // req.params.id — это СТРОКА. Сначала явно приводим к числу:
    const idNum = Number(req.params.id);
    // Number.isFinite проверяет «настоящее» конечное число (не NaN/Infinity).
    // ВАЖНО: глобальный isFinite("123") → true (неявно приводит к числу),
    // а Number.isFinite("123") → false (строго, без приведения).
    // Поэтому делаем два шага: Number(...) → Number.isFinite(idNum)
    // Также это гораздо надежнее чем проверка с помощью IsNaN
    if (!Number.isFinite(idNum) || idNum <= 0) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid project ID"});
        return;
    }

    const row = await getProjectById(idNum);
    if (!row) {
        res.sendStatus(HTTP.NOT_FOUND);
        return;
    }
    res.status(HTTP.OK).json(row);
});

// GET /projects/:id/with-tasks
app.get("/projects/:id/with-tasks",
    async (req: Request<{ id: string }>, res: Response<ProjectWithTasks | { error: string }>) => {
        // req.params.id — это СТРОКА. Сначала явно приводим к числу:
        const idNum = Number(req.params.id);

        // Number.isFinite проверяет «настоящее» конечное число (не NaN/Infinity).
        // ВАЖНО: глобальный isFinite("123") → true (неявно приводит к числу),
        // а Number.isFinite("123") → false (строго, без приведения).
        // Поэтому делаем два шага: Number(...) → Number.isFinite(idNum)
        // Также это гораздо надежнее чем проверка с помощью IsNaN
        if (!Number.isFinite(idNum) || idNum <= 0) {
            res.status(HTTP.BAD_REQUEST).json({error: "Invalid project ID"});
            return;
        }

        const row = await getProjectWithTasks2(idNum);
        if (!row) {
            res.sendStatus(HTTP.NOT_FOUND);
            return;
        }
        res.status(HTTP.OK).json(row);
    });

// POST /projects   { name, description?, status? }
app.post("/projects", async (req: Request, res: Response) => {
    const {name, description, status} = req.body as NewProjectInput;

    if (!name) {
        res.status(HTTP.BAD_REQUEST).json({error: "Name is required"});
        return;
    }

    const created = await createProject({
        name,
        description,
        status,
    });
    res.status(HTTP.CREATED).json(created);
});

// PUT /projects/:id   { name, description?, status? }
app.put("/projects/:id", async (req: Request, res: Response) => {
    const idNum = Number(req.params.id);
    if (!Number.isFinite(idNum) || idNum <= 0) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid project ID"});
        return;
    }

    const {name, description, status} = req.body as UpdateProjectInput;

    if (!name || !description || !status) {
        res.status(HTTP.BAD_REQUEST).json({error: "name, description, status are required"});
        return;
    }

    const updated = await updateProject(idNum, {
        name: name.trim(),
        description,
        status,
    });
    if (!updated) {
        res.sendStatus(HTTP.NOT_FOUND);
        return;
    }
    res.status(HTTP.OK).json(updated); // (можно 204 No Content)
});

// DELETE /projects/:id
app.delete("/projects/:id", async (req: Request, res: Response) => {
    const idNum = Number(req.params.id);
    // Ещё раз: Number(...) → Number.isFinite(...) → проверка > 0
    if (!Number.isFinite(idNum) || idNum <= 0) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid project ID"});
        return;
    }

    const ok = await deleteProject(idNum);
    if (!ok) {
        res.sendStatus(HTTP.NOT_FOUND);
        return;
    }
    res.sendStatus(HTTP.NO_CONTENT);
});

app.post("/projects/:projectId/tasks", async (req: Request, res: Response) => {
    const idNum = Number(req.params.projectId);
    if (!Number.isFinite(idNum) || idNum <= 0) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid project ID"});
        return;
    }
    const {title, is_done} = req.body as NewTaskInput
    if (!title) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid title"});
    }
    const created = await createTask(idNum, {title, is_done});
    res.status(HTTP.CREATED).json(created);
})

app.get("/projects/:projectId/tasks",
    async (req: Request<{ projectId: string }>, res: Response<TaskRowDb[] | { error: string }>) => {
        const idNum = Number(req.params.projectId);
        if (!Number.isFinite(idNum) || idNum <= 0) {
            res.status(HTTP.BAD_REQUEST).json({error: "Invalid project ID"});
            return;
        }
        const rows = await getProjectTasks(idNum);
        res.status(HTTP.OK).json(rows);
    })

app.put("/tasks/:id", async (req: Request, res: Response) => {
    const idNum = Number(req.params.id);
    if (!Number.isFinite(idNum) || idNum <= 0) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid task ID"});
        return;
    }

    const {title, is_done} = req.body as UpdateTaskInput;

    if (!title) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid title"});
    }

    const updated = await updateTask(idNum, {title, is_done});
    if (!updated) {
        res.sendStatus(HTTP.NOT_FOUND);
        return;
    }
    res.status(HTTP.OK).json(updated);
});


app.delete("/tasks/:id", async (req: Request, res: Response) => {
    const idNum = Number(req.params.id);
    if (!Number.isFinite(idNum) || idNum <= 0) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid task ID"});
        return;
    }

    const ok = await deleteTask(idNum);
    if (!ok) {
        res.sendStatus(HTTP.NOT_FOUND);
        return;
    }
    res.sendStatus(HTTP.NO_CONTENT);
});


app.listen(port, () => console.log(`✅ http://localhost:${port}`));