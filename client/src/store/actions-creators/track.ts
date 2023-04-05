import axios from "axios";
import { Dispatch } from "redux";
import { TrackAPI } from "../../api";
import {
  fetchingTracks,
  fetchingTracksSuccess,
  fetchingTracksError,
} from "../reducers/track.slice";

export const getAllTracks = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchingTracks());
    const response = await TrackAPI.getTrack();

    dispatch(fetchingTracksSuccess(response.data));
  } catch (error) {
    const err = error as Error;
    dispatch(fetchingTracksError(err.message));
  }
};
