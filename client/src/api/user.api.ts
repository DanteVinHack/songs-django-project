import {instance, LS_TOKEN_KEY} from "."

import {config} from "../../config"
import {getStorageValue} from "../help"

import {IUser, IUserToken} from "../types/user"

export const UserAPI = {
  update(data: IUser) {
    const token = getStorageValue<IUserToken>(LS_TOKEN_KEY)

    return instance.put(config.ME_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `${token?.token_type} ${token?.access_token}` 
      }
    })
  },
}
