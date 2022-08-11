import React, { FC } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
};

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
