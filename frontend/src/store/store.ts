import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { songReducer } from "./reducers/songs.slice";

const rootReducer = combineReducers({
  song: songReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;