import axios, {CreateAxiosDefaults} from "axios";
import {config} from "../../config";

import {TrackAPI} from "./track.api";
import {UserAPI} from "./user.api";
import {AuthAPI} from "./auth.api";
import {GenreAPI} from "./genre.api";

const configInstance: CreateAxiosDefaults = {
  withCredentials: false,
  baseURL: config.BASE_URL,
};

export const instance = axios.create(configInstance);
export const LS_TOKEN_KEY = "token"

export {
	TrackAPI,
	UserAPI,
	AuthAPI,
	GenreAPI
}
