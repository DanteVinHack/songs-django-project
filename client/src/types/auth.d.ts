import { HeadersDefaults } from "axios";

export interface IUseAxios<T> {
  data: T | undefined;
  error: string | null;
  isLoading: boolean;
}

export interface IUseAxiosOptions {
  body: Object;
  headers: HeadersDefaults
}

export type Method = 'get' | 'post' | 'delete' | 'put'

export type ContentType = "application/json" | "multipart/form-data"
