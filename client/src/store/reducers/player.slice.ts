import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPlayerState } from "../../types/player";
import { ITrack } from "../../types/track";


const initialState: IPlayerState = {
  value: null,
  isPlay: false,
  currentTime: 0,
  duration: 0,
  volume: .5,
  repeat: false
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setVolume(state, action: PayloadAction<number>) {
      if (state.volume < 0 || state.volume > 1) {
        throw new Error("Error: volume should be less one and more zero.");
      }
      state.volume = action.payload
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload
    },
    setPause(state) {
      state.isPlay = false
    },
    setPlay(state) {
      state.isPlay = true
    },
    setValue(state, action: PayloadAction<ITrack>) {
      state.duration = 0
      state.currentTime = 0
      state.value = action.payload
    },
    setRepeat(state, action: PayloadAction<boolean>) {
      state.repeat = action.payload
    }
  }
})

export const {
  setVolume,
  setDuration,
  setCurrentTime,
  setPlay,
  setPause,
  setValue,
  setRepeat
} = playerSlice.actions

export const playerReducer = playerSlice.reducer
