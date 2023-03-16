import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { songReducer } from "./reducers/songs.slice";
import { userReducer } from "./reducers/user.slicer";

const rootReducer = combineReducers({
  song: songReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
