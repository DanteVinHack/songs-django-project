import axios, { CreateAxiosDefaults } from "axios";
import { config } from "../config";
import { ITrack } from "./types/track";
import { IUser, IUserToken } from "./types/user";

const configInstance: CreateAxiosDefaults = {
  withCredentials: false,
  baseURL: config.BASE_URL,
};

const instance = axios.create(configInstance);

export const authAPI = {
  getMe({ token_type, access_token }: IUserToken) {
    return instance.get<IUser>("api/auth/me/", {
      headers: {
        "Authorization": `${token_type} ${access_token}`,
      },
    });
  },
  login(formData: FormData) {
    return instance.post<IUserToken>(config.LOGIN_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  register(formData: FormData) {
    return instance.post<IUserToken>(config.REGISTER_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const userAPI = {
  updateUser(formData: FormData) {
    const token: IUserToken | null = JSON.parse(localStorage.getItem("token"))

    if (!token) {
      throw new Error("Token isn't defined.")
    }

    return instance.put(config.ME_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `${token.token_type} ${token.access_token}` 
      }
    })
  }
}

export const TrackAPI = {
  getTrack() {
    return instance.get<ITrack>("api/track/");
  },
  getInfoTrackFile(url: string) {
    return instance.get<AudioNode>(url);
  },
};
