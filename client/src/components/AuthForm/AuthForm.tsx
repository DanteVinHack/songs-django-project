import React, { useEffect } from "react";
import style from "./AuthForm.module.css";

import { Button, Input } from "../UI";

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

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (mode === AuthMode.login) {
      dispatch(await authenticationRequest(formData, AuthMode.login));
    } else {
      dispatch(await authenticationRequest(formData, AuthMode.register));
    }

    if (!error) {
      navigator("/")
    } else {
      // do something
    }
  };

  return (
    <form onSubmit={onSubmit} className={style["auth-form"]}>
      <Input placeholder="Введите Email" name="email" type="email" />
      <Input placeholder="Введите пароль" name="password" type="password" />
      {mode === AuthMode.login || (
        <>
          <Input
            placeholder="Введите желамое имя"
            name="display_name"
            type="text"
          />
          <Input type="file" name="avatar" accept="jpg, png" />
        </>
      )}
      {/*<Link to="/">*/}
      <Button>
        {mode === AuthMode.login ? "Войти" : "Зарегистрироваться"}
      </Button>
      {/*</Link>*/}
    </form>
  );
};
