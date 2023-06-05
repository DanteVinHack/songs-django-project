import {AppDispatch, RootState, store} from "./store";

import * as actionsCreators from "./actions-creators"
import { actions as SyncActions } from "./reducers"


export default store 

export const actions = {
	...actionsCreators,
	...SyncActions
}

export type {
  RootState,
  AppDispatch
}
