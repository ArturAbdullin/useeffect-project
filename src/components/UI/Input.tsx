import React, { useRef, useImperativeHandle } from "react";

import styles from "./Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isValid: boolean | null;
  label: string;
  value: string;
};

export type InputRefType = {
  focusInput: () => void;
};

const Input = React.forwardRef<InputRefType, InputProps>((props, ref) => {
  const { isValid, label, value, ...inputProps } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current?.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focusInput: focus,
    };
  });

  return (
    <div
      className={`${styles.control} ${isValid === false ? styles.invalid : ""}`}
    >
      <label htmlFor={inputProps.id}>{label}</label>
      <input ref={inputRef} {...inputProps} />
    </div>
  );
});

export default Input;
