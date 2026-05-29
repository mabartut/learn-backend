import {TaskOut} from "./GetProjectTasksOut";

/**
 * Add new task
 */
export type PostTaskOut = TaskOut | { error: string };