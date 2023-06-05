import {instance, LS_TOKEN_KEY} from ".";

import {config} from "../../config";
import {getStorageValue} from "../help";

import {IUser, IUserToken} from "../types/user";

export const AuthAPI = {
  get() {
		const token = getStorageValue<IUserToken>(LS_TOKEN_KEY)

    return instance.get<IUser>("api/auth/me/", {
      headers: {
        "Authorization": `${token?.token_type} ${token?.access_token}`,
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
