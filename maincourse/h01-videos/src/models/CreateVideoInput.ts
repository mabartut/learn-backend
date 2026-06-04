import {Resolutions} from "../types";

export type CreateVideoInput = {
    title: string;                      // maxLength: 40
    author: string;                    // maxLength: 20
    availableResolutions: Resolutions[]; // минимум одно разрешение
    canBeDownloaded?: boolean;          // по умолчанию: false
    minAgeRestriction?: number | null;  // 1-18, null = без ограничений
    publicationDate?: string;
};