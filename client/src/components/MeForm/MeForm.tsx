import React from 'react'
import style from "./MeForm.module.css"

import { Button, Input, FileUploader } from '../UI'

import { useAppSelector } from '../../hooks/use.store'

export const MeForm: React.FC = () => {
  const { avatar, email, display_name } = useAppSelector(state => state.user)

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.target)
    console.log(formData)
  }

  return (
    <div className={style.me}>
      <form className={style.me__form} onSubmit={onSubmit}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={email || ""}
        />
        <Input
          type="text"
          name="display_name"
          placeholder="Никнейм"
          value={display_name || ""}
        />
        <Input
          type="password"
          name="password"
          placeholder="Новый пароль"
        />

        <FileUploader
          name="avatar"
          defaultImage={avatar || undefined}
          accept="image/*"
					rounded={true}
        />

        <Button type="submit">
          Сохранить изменения
        </Button>
      </form>
    </div>
  )
}
