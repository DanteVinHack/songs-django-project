import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack, ITrackState } from "../../types/track";

const initialState: ITrackState = {
  tracks: [],
  isLoading: false,
  error: null,
};

const trackSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchingTracks(state: ITrackState) {
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
  },
});

export const {
  fetchingTracks,
  fetchingTracksSuccess,
  fetchingTracksError,
} = trackSlice.actions;

export const trackReducer = trackSlice.reducer;
