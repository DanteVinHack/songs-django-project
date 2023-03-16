import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISong, ISongState } from "../../types/song";

const initialState: ISongState = {
  songs: [],
  isLoading: false,
  error: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchingSongs(state: ISongState) {
      state.isLoading = true;
      state.error = null;
    },
    fetchingSongsSuccess(state, action: PayloadAction<ISong[]>) {
      state.isLoading = false;
      state.songs = action.payload;
    },
    fetchingSongsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchingSongs, fetchingSongsSuccess, fetchingSongsError } =
  songSlice.actions;

export const songReducer = songSlice.reducer;
