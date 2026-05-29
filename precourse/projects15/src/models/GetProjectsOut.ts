/**
 * Part of project data
 */
export type GetProjectsOut =
    ProjectOut | { error: string };

export type ProjectOut = {
    id: number
    name: string
    description: string
    status: "todo" | "in_progress" | "done"
    created_at: Date
}