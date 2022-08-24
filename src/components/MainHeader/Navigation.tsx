import React, { FC, useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import styles from "./Navigation.module.css";

const Navigation: FC = () => {
  const authCtx = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <>
            <li>
              <a href="/">Users</a>
            </li>
            <li>
              <a href="/">Admin</a>
            </li>
            <li>
              <button onClick={authCtx.onLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
