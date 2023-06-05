import {instance, LS_TOKEN_KEY} from ".";

import {config} from "../../config";
import {getStorageValue} from "../help";

import {IAddTrack, ITrack} from "../types/track";
import {IUserToken} from "../types/user";

export const TrackAPI = {
  get() {
    return instance.get<ITrack[]>("api/track/");
  },
	getFavorite() {
		const token = getStorageValue<IUserToken>(LS_TOKEN_KEY)

		return instance.get<ITrack[]>("api/auth/me/favorite/", {
			headers: {
        "Authorization": `${token?.token_type} ${token?.access_token}` 
			}
		})	
	},
	getDetail(trackId: number) {
		return instance.get<ITrack>(`api/track/${trackId}/`)
	},
	update(track: ITrack) {
		const token = getStorageValue<IUserToken>(LS_TOKEN_KEY)

		return instance.put(`api/track/${track.id}/`, JSON.stringify(track), {
			headers: {
        "Content-Type": "application/json",
        "Authorization": `${token?.token_type} ${token?.access_token}` 
			},
		})
	},
  getInfoTrackFile(url: string) {
    return instance.get<AudioNode>(url);
  },
	add(form: IAddTrack) {
    const token = getStorageValue<IUserToken>(LS_TOKEN_KEY)
		
		return instance.post(config.ME_TRACKS, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `${token?.token_type} ${token?.access_token}` 
      }
		})	
	}	
}
