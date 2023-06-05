import React from "react"
import style from "./Form.module.css"

interface FormProps extends React.HTMLProps<HTMLFormElement> {
}

export const Form: React.FC<FormProps> = ({ children, className, ...props }) => {
	return (
		<form {...props} className={`${style.form} ${className}`} >
			{children}
		</form>
	)
}
