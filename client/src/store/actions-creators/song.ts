import axios from "axios";
import { Dispatch } from "redux";
import { ISong } from "../../types/song";
import {
  fetchingSongs,
  fetchingSongsError,
  fetchingSongsSuccess,
} from "../reducers/songs.slice";

export const getAllSongs = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchingSongs());
    const response = await axios.get<ISong[]>("http://localhost:8000/song/");

    dispatch(fetchingSongsSuccess(response.data));
  } catch (error) {
    const err = error as Error;
    dispatch(fetchingSongsError(err.message));
  }
};
