import React, { FC, useContext } from "react";
import AuthContext from "../../contexts/auth-context";
import { AuthenticationProps } from "../../models/AuthenticationProps";
import styles from "./Navigation.module.css";

type NavigationProps = {} & AuthenticationProps;

const Navigation: FC<NavigationProps> = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        {ctx.isLoggedIn && (
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
