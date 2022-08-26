import React, { FC } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
