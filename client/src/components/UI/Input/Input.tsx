import React, { HTMLProps }  from "react";
import style from "./Input.module.css";

interface InputProps extends HTMLProps<HTMLInputElement> {
  vertical?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ vertical, ...props }, ref) => {

  return (
    <input
      ref={ref}
      className={style.input}
      orient={vertical ? "vertical" : "horizontal"}
      {...props}
    />
  );
});
