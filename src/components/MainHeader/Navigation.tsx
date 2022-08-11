import React, { FC } from "react";
import { AuthenticationProps } from "../../models/AuthenticationProps";
import styles from "./Navigation.module.css";

type NavigationProps = {} & AuthenticationProps;

const Navigation: FC<NavigationProps> = (props) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {props.isLoggedIn && (
          <>
            <li>
              <a href="/">Users</a>
            </li>
            <li>
              <a href="/">Admin</a>
            </li>
            <li>
              <button onClick={props.onLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
