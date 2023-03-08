import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ISong, ISongState } from "../../types/song";

const initialState: ISongState = {
  songs: [],
};

const songSlice: Slice = createSlice({
  name: "song",
  initialState,
  reducers: {
    addSongToFavorite(state: ISongState, action: PayloadAction<ISong>) {
      state.songs.push(action.payload);
    },
  },
});

export const { addSongToFavorite } = songSlice.actions;
export const songReducer = songSlice.reducer;
