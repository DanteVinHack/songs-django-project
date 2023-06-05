import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SetStateAction} from "react";
import {getStorageValue, setStorageValue} from "../../help";

import {IPlayerState, IPlayerStorage} from "../../types/player";
import {ITrack} from "../../types/track";

const initialState: IPlayerState = {
  value: null,
  isPlay: false,
  currentTime: 0,
  duration: 0,
  volume: getStorageValue<IPlayerStorage>("player")?.volume || .5,
  repeat: getStorageValue<IPlayerStorage>("player")?.repeat || false
}

const setCurrentValue = (state: IPlayerState, action: PayloadAction<ITrack | null>) => {
	state.duration = 0
	state.currentTime = 0
	state.value = action.payload
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
		setTrack(state, action: PayloadAction<ITrack>) {
			const track = action.payload

			if (state.value?.id === track.id) {
				state.isPlay = !state.isPlay
			} else {
				setCurrentValue(state, action)
			}
		},
    setVolume(state, action: PayloadAction<number>) {
      if (state.volume < 0 || state.volume > 1) {
        throw new Error("Error: volume should be less one and more zero.");
      }

      state.volume = action.payload

			setStorageValue<IPlayerStorage>("player", {
				volume: state.volume,
				repeat: state.repeat
			})
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
    setValue: setCurrentValue,
    setRepeat(state, action: PayloadAction<boolean>) {
      state.repeat = action.payload
			setStorageValue<IPlayerStorage>("player", {
				volume: state.volume,
				repeat: state.repeat
			})
    }
  }
})

export const {
	setTrack,
  setVolume,
  setDuration,
  setCurrentTime,
  setPlay,
  setPause,
  setValue,
  setRepeat
} = playerSlice.actions

export const actions = playerSlice.actions

export const playerReducer = playerSlice.reducer
