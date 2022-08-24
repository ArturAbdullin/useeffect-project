import React, { FC } from "react";
import { AuthenticationProps } from "../../models/AuthenticationProps";
import styles from "./MainHeader.module.css";
import Navigation from "./Navigation";

type MainHeaderProps = {} & AuthenticationProps;

const MainHeader: FC<MainHeaderProps> = (props) => {
  return (
    <header className={styles["main-header"]}>
      <h1>A Typical Page</h1>
      <Navigation onLogout={props.onLogout} />
    </header>
  );
};
export default MainHeader;
