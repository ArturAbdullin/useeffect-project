import React, { FC } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

const Card: FC<CardProps> = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
