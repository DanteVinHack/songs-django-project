import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../../types/user";

const initialState: IUserState = {
  email: null,
  display_name: null,
  avatar: null,
  isAuth: false,
  error: null
};

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUserSuccess(state, action: PayloadAction<IUser>) {
      const { email, display_name, avatar } = action.payload;

      state.email = email;
      state.display_name = display_name;
      state.avatar = avatar;
      state.isAuth = true;
    },
    authUserError(state, action: PayloadAction<string>) {
      state.isAuth = false;
      state.error = action.payload
    },
  },
});

export const { authUserError, authUserSuccess } = userSlicer.actions;

export const userReducer = userSlicer.reducer;
