import React from 'react'
import style from "./MeForm.module.css"

import { Form } from '../Form'
import { Logout } from '../Logout/Logout'
import { Button, Input, FileUploaderWithPreview } from '../UI'

import { useActions } from '../../hooks/use.actions'
import { useAppSelector } from '../../hooks/use.store'
import { useForm } from '../../hooks/use.form'

import { IUser } from '../../types/user'

export const MeForm: React.FC = () => {
  const { avatar, email, display_name } = useAppSelector(state => state.user)
	const { updateUserRequest } = useActions()

	const {form, onChange} = useForm<IUser>({ email, display_name, avatar })

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()

		updateUserRequest(form)
  }

  return (
    <div className={style.me}>
      <Form onSubmit={onSubmit} onChange={onChange}>

        <Input
          type="text"
          name="email"
          placeholder="Email"
					defaultValue={email || ""}
        />

        <Input
          type="text"
          name="display_name"
          placeholder="Никнейм"
					defaultValue={display_name || ""}
        />

				<FileUploaderWithPreview
					name="avatar"
					accept="image/*"
					placeholder="Загрузить аватарку"
					defaultFile={avatar || ""}
					required
				/>
							
        <Button type="submit">
          Сохранить изменения
        </Button>

				<Logout />
      </Form>
    </div>
  )
}
