import React from "react";
import {MeForm} from "../components/MeForm/MeForm";
import {Title} from "../components/UI";

export const Me: React.FC = () => {
  return (
		<div className="page">
			<Title>Настройки</Title>
			<MeForm />
		</div>
  );
};
