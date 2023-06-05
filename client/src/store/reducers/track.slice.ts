import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack, ITrackState } from "../../types/track";

import { findIndexById } from "../../help";

const initialState: ITrackState = {
  tracks: [],
  isLoading: false,
  error: null,
};

const trackSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchingTracks(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchingTracksSuccess(state, action: PayloadAction<ITrack[]>) {
      state.isLoading = false;
      state.tracks = action.payload;
    },
    fetchingTracksError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
		updateTrackById(state, action: PayloadAction<ITrack>) {
			const trackIndex = findIndexById(state.tracks, action.payload.id)

			state.tracks[trackIndex] = action.payload
		},
  },
});

export const {
  fetchingTracks,
  fetchingTracksSuccess,
  fetchingTracksError,
	updateTrackById
} = trackSlice.actions;
export const actions = trackSlice.actions

export const trackReducer = trackSlice.reducer;
