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
import {ReqWithBody, ReqWithParams, ReqWithParamsAndBody, ReqWithQuery} from "./types";
import {GetProjectsIn} from "./models/GetProjectsIn";
import {IdParams} from "./models/IdParams";
import {ProjectIdParams} from "./models/ProjectIdParams";
import {GetProjectsOut} from "./models/GetProjectsOut";
import {GetProjectsWithTasksOut} from "./models/GetProjectsWithTasksOut";
import {GetProjectTasksOut} from "./models/GetProjectTasksOut";

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

const projectOutMapper = (r: ProjectRowDb) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    status: r.status,
    created_at: r.created_at
})
const taskOutMapper = (t: TaskRowDb) => ({
    id: t.id,
    project_id: t.project_id,
    title: t.title,
    is_done: t.is_done,
    created_at: t.created_at
})

// GET /projects?name=...
app.get("/projects", async (req: ReqWithQuery<GetProjectsIn>,
                            res: Response<GetProjectsOut[]>) => {
    const {name, status} = req.query;
    const rows: ProjectRowDb[] = await listProjects({name, status});
    res.status(HTTP.OK)

    res.json(rows.map(projectOutMapper));
});

// GET /projects/:id
app.get("/projects/:id",
    async (req: ReqWithParams<IdParams>,
           res: Response<GetProjectsOut>) => {
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

        const row: ProjectRowDb | null = await getProjectById(idNum);
        if (!row) {
            res.sendStatus(HTTP.NOT_FOUND);
            return;
        }

        res.status(HTTP.OK).json(projectOutMapper(row));
    });

// GET /projects/:id/with-tasks
app.get("/projects/:id/with-tasks",
    async (req: ReqWithParams<IdParams>,
           res: Response<GetProjectsWithTasksOut>) => {
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

        const row: ProjectWithTasks | null = await getProjectWithTasks2(idNum);

        if (!row) {
            res.sendStatus(HTTP.NOT_FOUND);
            return;
        }

        res.status(HTTP.OK)

        let result: GetProjectsWithTasksOut = {
            project: projectOutMapper(row.project),
            tasks: row.tasks.map(taskOutMapper)
        }
        res.json(result);
    });

// POST /projects   { name, description?, status? }
app.post("/projects", async (req: ReqWithBody<NewProjectInput>, res: Response) => {
    const {name, description, status} = req.body;

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
app.put("/projects/:id", async (req: ReqWithParamsAndBody<IdParams, UpdateProjectInput>, res: Response) => {
    const idNum = Number(req.params.id);
    if (!Number.isFinite(idNum) || idNum <= 0) {
        res.status(HTTP.BAD_REQUEST).json({error: "Invalid project ID"});
        return;
    }

    const {name, description, status} = req.body;

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
app.delete("/projects/:id", async (req: ReqWithParams<IdParams>, res: Response) => {
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

app.post("/projects/:projectId/tasks", async (req: ReqWithParams<ProjectIdParams>, res: Response) => {
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
    async (req: ReqWithParams<ProjectIdParams>, res: Response<GetProjectTasksOut>) => {
        const idNum = Number(req.params.projectId);
        if (!Number.isFinite(idNum) || idNum <= 0) {
            res.status(HTTP.BAD_REQUEST).json({error: "Invalid project ID"});
            return;
        }
        const rows = await getProjectTasks(idNum);
        res.status(HTTP.OK).json(rows.map(taskOutMapper));
    })

app.put("/tasks/:id", async (req: ReqWithParams<IdParams>, res: Response) => {
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

app.delete("/tasks/:id", async (req: ReqWithParams<IdParams>, res: Response) => {
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