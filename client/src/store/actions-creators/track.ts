import { Dispatch } from "redux";

import { TrackAPI } from "../../api";

import { ITrack } from "../../types/track";
import { IUserToken } from "../../types/user";

import {
  fetchingTracks,
  fetchingTracksSuccess,
  fetchingTracksError,
	updateTrackById,
} from "../reducers/track.slice";

export const getAllTracks = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchingTracks());
    const response = await TrackAPI.get();

    dispatch(fetchingTracksSuccess(response.data));
  } catch (error) {
    const err = error as Error;
    dispatch(fetchingTracksError(err.message));
  }
};

export const getFavoriteTracks = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchingTracks());
		const token: IUserToken = JSON.parse(localStorage.getItem('token'))

    const response = await TrackAPI.getFavorite();

    dispatch(fetchingTracksSuccess(response.data));
  } catch (error) {
    const err = error as Error;
    dispatch(fetchingTracksError(err.message));
  }
};

export const updateTrack = (updatedTrack: ITrack) => async (dispatch: Dispatch) => {
	try {
		const response = await TrackAPI.update(updatedTrack)

		dispatch(updateTrackById(response.data))	
	} catch (error) {
		const err = error as Error
		throw new Error(err.message)
	}
}
