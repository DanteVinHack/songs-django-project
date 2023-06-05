import React, { HTMLProps }  from "react";
import style from "./Input.module.css";

interface InputProps extends HTMLProps<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {

  return (
    <input
      ref={ref}
      className={style.input}
      {...props}
    />
  );
});
