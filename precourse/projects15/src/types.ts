import {Request} from "express";

export type ReqWithParams<T> = Request<T, {}, {}, {}>
export type ReqWithBody<B> = Request<{}, {}, B, {}>
export type ReqWithParamsAndBody<T, B> = Request<T, {}, B, {}>
export type ReqWithQuery<T> = Request<{}, {}, {}, T>




