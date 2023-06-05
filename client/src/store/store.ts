import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {genreReducer} from "./reducers/genre.slice";
import {playerReducer} from "./reducers/player.slice";
import {trackReducer} from "./reducers/track.slice";
import {userReducer} from "./reducers/user.slice";

export const rootReducer = combineReducers({
  track: trackReducer,
  user: userReducer,
  player: playerReducer,
	genre: genreReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
