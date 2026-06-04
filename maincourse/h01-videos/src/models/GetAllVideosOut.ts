import {Resolutions} from "../types";

export type GetAllVideosOut = Video[]

export type Video = {
    id: number;                        // integer($int32)
    title: string;
    author: string;
    canBeDownloaded: boolean;          // по умолчанию: false
    minAgeRestriction: number | null;  // 1-18, null = без ограничений
    createdAt: string;                 // $date-time
    publicationDate: string;           // $date-time, по умолчанию: createdAt + 1 день
    availableResolutions: Resolutions[];
};