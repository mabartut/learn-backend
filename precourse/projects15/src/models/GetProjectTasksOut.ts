/**
 * Tasks by projectId
 */
export type GetProjectTasksOut =
    Array<{
        id: number
        project_id: number
        title: string
        is_done: boolean
        created_at: Date
    }>
    | { error: string };
