import React from "react";

import styles from "./Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isValid: boolean | null;
  label: string;
  value: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isValid, label, value, ...inputProps } = props;

  return (
    <div
      className={`${styles.control} ${isValid === false ? styles.invalid : ""}`}
    >
      <label htmlFor={inputProps.id}>{label}</label>
      <input ref={ref} {...inputProps} />
    </div>
  );
});

export default Input;
