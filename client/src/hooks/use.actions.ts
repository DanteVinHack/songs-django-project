import {bindActionCreators} from "redux"
import {useAppDispatch} from "./use.store"

import {actions} from "../store"

export const useActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators(actions, dispatch)
}
