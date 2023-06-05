import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IGenre, IGenreState} from "../../types/genre";

const initialState: IGenreState = {
	genres: [],
	isLoading: false,
	error: null	
}

const genreSlice = createSlice({
	name: "genre",
	initialState,
	reducers: {
    fetchingGenres(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchingGenresSuccess(state, action: PayloadAction<IGenre[]>) {
      state.isLoading = false;
      state.genres = action.payload;
    },
    fetchingGenresError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
	}	
}) 

export const { fetchingGenres, fetchingGenresSuccess, fetchingGenresError } = genreSlice.actions
export const actions = genreSlice.actions

export const genreReducer = genreSlice.reducer
