import React from "react";
import { AuthForm } from "../../components/AuthForm";
import { AuthMode } from "../../enums/auth";

export const Register: React.FC = () => {
  return (
		<div>
			<AuthForm mode={AuthMode.register} />
		</div>
  );
};
