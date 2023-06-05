import React from "react";
import style from "./Button.module.css";

type TColors = "white" | "black"

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TColors;
}

export const Button: React.FC<IButton> = ({ children, className, color, ...props }) => {
	return (
    <button className={`${style.button} ${className} ${color}`} {...props}>
			{children}
		</button>
	);
};
