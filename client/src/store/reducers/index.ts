import {actions as genreActions} from "./genre.slice"
import {actions as trackActions} from "./track.slice"
import {actions as playerActions} from "./player.slice"
import {actions as userActions} from "./user.slice"

export const actions = {
	...genreActions,
	...trackActions,
	...playerActions,
	...userActions
}


