import { Dispatch } from "redux";
import { authUserSuccess, authUserError } from "../reducers/user.slicer";
import { authAPI } from "../../api";

import { AuthMode } from "../../enums/auth";

export const authenticationRequest =
  (formData: FormData, mode: AuthMode) => async (dispatch: Dispatch) => {
    try {
      const { data } = await authAPI[mode](formData);

      localStorage.setItem("token", JSON.stringify(data))
      const response = await authAPI.getMe(data);
      
      dispatch(authUserSuccess(response.data));
    } catch (err) {
      const error = err as Error;
      dispatch(authUserError(error.message));
    }
  };
