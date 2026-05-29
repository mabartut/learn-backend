/**
 * Part of project data
 */
export type GetProjectsOut =
    {
        id: number
        name: string
        description: string
        status: "todo" | "in_progress" | "done"
        created_at: Date
    } | { error: string };
