/**
 * Tasks by projectId
 */
export type GetProjectTasksOut =
    Array<TaskOut>
    | { error: string };

export type TaskOut = {
    id: number
    project_id: number
    title: string
    is_done: boolean
    created_at: Date
}