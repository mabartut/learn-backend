import {ProjectOut} from "./GetProjectsOut";
import {TaskOut} from "./GetProjectTasksOut";

/**
 * Project with tasks
 */
export type GetProjectsWithTasksOut =
    {
        project: ProjectOut,
        tasks: TaskOut[];
    }
    | { error: string };