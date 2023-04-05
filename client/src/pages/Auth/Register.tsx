import React, { useState } from "react";
import { AuthForm } from "../../components/AuthForm";
import { useAppSelector } from "../../hooks/use.store";
import { AuthMode } from "../../enums/auth";

interface IRegisterForm {
  email: string;
  password: string;
  display_name: string;
  avatar: File;
}

export const Register: React.FC = () => {
  const [form, setForm] = useState<IRegisterForm>();
  const { isAuth } = useAppSelector((state) => state.user);

  if (isAuth) {
    alert("Зарегистрирован");
    return <></>;
  }

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    console.log(values);

    setForm(formData);
  };

  return (
    <AuthForm mode={AuthMode.register} />
  );
};
