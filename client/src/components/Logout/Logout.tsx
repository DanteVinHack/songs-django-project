import React from "react"
import style from "./Logout.module.css"
import {flushSync} from "react-dom"

import {Button} from "../UI"

import {useActions} from "../../hooks/use.actions"
import {useStorage} from "../../hooks/use.storage"
import {useNavigate} from "react-router-dom"

import {IUserToken} from "../../types/user"

export const Logout: React.FC = () => {
	const [_, setToken] = useStorage<IUserToken>("token")
	const { logout } = useActions()
	const navigator = useNavigate()

	const askLogout = () => {

		const isLogout = confirm('Вы точно хотите выйти из учетной записи?')

		if (isLogout) {
			flushSync(() => setToken(null))
			logout()
			navigator("/")
		}
	}

	return (
		<div>
			<Button
				onClick={askLogout}
				className={style.red}
				type="button"
			>
				Выйти
			</Button>
		</div>
	)
}
