import React from "react";
import style from "./Button.module.css";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: string;
}

export const Button: React.FC<IButton> = ({ children, className, color, ...props }) => {
	return (
    <button className={`${style.button} ${className}`} {...props} style={{ color: color }}>
			{children}
		</button>
	);
};
