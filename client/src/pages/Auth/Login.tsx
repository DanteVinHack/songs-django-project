import React from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { AuthMode } from "../../enums/auth";

export const Login: React.FC = () => {
  return <div>
    <AuthForm mode={AuthMode.login} />
  </div>;
};
