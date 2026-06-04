import {Request} from "express";

export type ReqWithParams<T> = Request<T, {}, {}, {}>
export type ReqWithBody<B> = Request<{}, {}, B, {}>
export type ReqWithParamsAndBody<T, B> = Request<T, {}, B, {}>
export type ReqWithQuery<T> = Request<{}, {}, {}, T>

export type APIErrorResult = {
    errorsMessages: FieldError[] | null;
};

export type FieldError = {
    message?: string;
    field?: string;
};

export type Resolutions = 'P144' | 'P240' | 'P360' | 'P480' | 'P720' | 'P1080' | 'P1440' | 'P2160';

export type UpdateVideoInputModel = {
    title: string;                     // maxLength: 40
    author: string;                   // maxLength: 20
    availableResolutions: Resolutions[]; // минимум одно разрешение
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;  // 1-18, null = без ограничений
    publicationDate: string;           // $date-time
};

