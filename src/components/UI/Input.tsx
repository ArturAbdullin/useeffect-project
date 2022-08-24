import React, { FC } from "react";

import styles from "./Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isValid: boolean | null;
  label: string;
  value: string;
}

const Input: FC<InputProps> = (props) => {
  const {isValid, label, value, ...inputProps} = props;
  return <div
  className={`${styles.control} ${
    isValid === false ? styles.invalid : ""
  }`}
>
  <label htmlFor={inputProps.id}>{label}</label>
  <input
    {...inputProps}
  />
  
</div>;
};

export default Input;
