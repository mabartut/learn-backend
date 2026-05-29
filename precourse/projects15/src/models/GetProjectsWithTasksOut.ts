/**
 * Project with tasks
 */
export type GetProjectsWithTasksOut = {
        project: {
                id: number
                name: string
                description: string
                status: "todo" | "in_progress" | "done"
                created_at: Date
        },
        tasks: TaskOut[];
}
     | { error: string };

type TaskOut = {
        id: number
        project_id: number
        title: string
        is_done: boolean
        created_at: Date
}