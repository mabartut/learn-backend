// src/repositories/projects.repository.ts
import {pool} from "../db";
import {ProjectRowDb} from "./projects.repository";

export type TaskRowDb = {
    id: number
    project_id: number
    title: string
    is_done: boolean
    created_at: Date
}

type ProjectWithTaskRowDb = ProjectRowDb & {
    t_id: number;
    t_project_id: number;
    t_title: string;
    t_is_done: boolean;
    t_created_at: Date;
};

export type NewTaskInput = {
    title: string
    is_done?: boolean
};

export type UpdateTaskInput = {
    title: string
    is_done: boolean
}

export type ProjectWithTasks = {
    project: ProjectRowDb;
    tasks: TaskRowDb[];
}

//заморочено, но в один запрос
export async function getProjectWithTasks1(
    id: number
): Promise<ProjectWithTasks | null> {
    const {rows} = await pool.query<ProjectWithTaskRowDb>(
        `SELECT p.*,
                t.id         as t_id,
                t.project_id as t_project_id,
                t.title      as t_title,
                t.is_done    as t_is_done,
                t.created_at as t_created_at
         FROM projects p
                  LEFT JOIN tasks t on t.project_id = p.id
         WHERE p.id = $1`,
        [id]
    );

    if (rows.length === 0) {
        return null
    }

    const project = {
        id: rows[0].id,
        name: rows[0].name,
        description: rows[0].description,
        status: rows[0].status,
        created_at: rows[0].created_at
    }

    const tasks: TaskRowDb[] = []
    rows.forEach(row => {
        if (row.t_id != null) {
            tasks.push({
                id: row.t_id,
                project_id: row.t_project_id,
                is_done: row.t_is_done,
                title: row.t_title,
                created_at: row.t_created_at
            })
        }
    })

    return {project, tasks};
}


//проще, но в два запроса
export async function getProjectWithTasks2(
    id: number
): Promise<ProjectWithTasks | null> {
    const projectResult = await pool.query<ProjectRowDb>(
        `SELECT *
         FROM projects
         WHERE id = $1`,
        [id]
    );

    if (projectResult.rows.length === 0) {
        return null
    }

    const tasksResult = await pool.query<TaskRowDb>(
        `SELECT *
         FROM tasks
         WHERE project_id = $1
         ORDER BY id DESC`,
        [id]
    );

    return {project: projectResult.rows[0], tasks: tasksResult.rows};
}

export async function createTask(
    project_id: number,
    data: NewTaskInput
): Promise<TaskRowDb> {
    const {rows} = await pool.query<TaskRowDb>(
        `INSERT INTO tasks (project_id, title, is_done)
         VALUES ($1, $2, COALESCE($3, false))
         RETURNING id, project_id, title, is_done, created_at`,
        [project_id, data.title, data.is_done]
    );
    return rows[0];
}

export async function getProjectTasks(
    project_id: number
): Promise<TaskRowDb[]> {
    const {rows} = await pool.query<TaskRowDb>(
        `SELECT *
         FROM tasks
         WHERE project_id = $1
         ORDER BY id DESC`,
        [project_id]
    );
    return rows;
}

export async function updateTask(
    id: number,
    data: UpdateTaskInput
): Promise<TaskRowDb | null> {
    const {rows} = await pool.query<TaskRowDb>(
        `UPDATE tasks
         SET title   = $2,
             is_done = $3
         WHERE id = $1
         RETURNING *`,
        [id, data.title, data.is_done]
    );
    return rows[0] ?? null;
}

export async function deleteTask(id: number): Promise<boolean> {
    const res = await pool.query(`DELETE
                                  FROM tasks
                                  WHERE id = $1`, [id]);
    return res.rowCount === 1;
}


