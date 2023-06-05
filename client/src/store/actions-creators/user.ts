import {Dispatch} from "redux";
import {authUserSuccess, authUserError, updateUser} from "../reducers/user.slice";
import {AuthAPI, UserAPI} from "../../api";

import {AuthMode} from "../../enums/auth";
import {IUser} from "../../types/user";

export const authenticationRequest = (formData: FormData, mode: AuthMode) => async (dispatch: Dispatch) => {
	try {
		const { data } = await AuthAPI[mode](formData);

		localStorage.setItem("token", JSON.stringify(data))
		const response = await AuthAPI.get();
		
		dispatch(authUserSuccess(response.data));
	} catch (err) {
		const error = err as Error;
		dispatch(authUserError(error.message));
	}
};

export const meRequest = () => async (dispatch: Dispatch) => {
	try {
		const response = await AuthAPI.get()

		dispatch(authUserSuccess(response.data));
	} catch (err) {
		const error = err as Error;
		dispatch(authUserError(error.message));
	}
}

export const updateUserRequest = (data: IUser) => async (dispatch: Dispatch) => {
	try {
		const response = await UserAPI.update(data)

		console.log(response.data)

		dispatch(updateUser(response.data));
	} catch (err) {
		const error = err as Error;
		dispatch(authUserError(error.message));
	}
}
