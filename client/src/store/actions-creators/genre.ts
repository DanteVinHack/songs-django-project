import {Dispatch} from "@reduxjs/toolkit";

import {fetchingGenres, fetchingGenresSuccess, fetchingGenresError} from "../reducers/genre.slice";

import {GenreAPI} from "../../api";

export const getAllGenres = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchingGenres());
    const response = await GenreAPI.getGenres();

    dispatch(fetchingGenresSuccess(response.data));
  } catch (error) {
    const err = error as Error;
    dispatch(fetchingGenresError(err.message));
  }
};
