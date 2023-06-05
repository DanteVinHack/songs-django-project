import React from "react";
import style from "./AuthForm.module.css";

import { Button, FileUploader, Input } from "../UI";
import { Form } from "../Form";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/use.store";
import { authenticationRequest } from "../../store/actions-creators/user";

import { AuthMode } from "../../enums/auth";

interface AuthFormProps {
  mode: AuthMode;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { error, email } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();
  const navigator = useNavigate()

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target);

		navigator("/")

    if (mode === AuthMode.login) {
      dispatch(authenticationRequest(formData, AuthMode.login));
    } else {
      dispatch(authenticationRequest(formData, AuthMode.register));
    }

    if (error) {

    }
	};

  return (
    <Form onSubmit={onSubmit} className={style["auth-form"]}>

      <Input placeholder="Введите Email" name="email" type="email" />
      <Input placeholder="Введите пароль" name="password" type="password" />

      {mode === AuthMode.login || (
        <>
          <Input
            placeholder="Введите желамое имя"
            name="display_name"
            type="text"
          />
						<FileUploader
							placeholder="Желаемый аватар"
							name="avatar"
							accept="jpg, png"
							required={false}
						/>
        </>
      )}

      <Button>
        {mode === AuthMode.login ? "Войти" : "Зарегистрироваться"}
      </Button>

    </Form>
  );
};
