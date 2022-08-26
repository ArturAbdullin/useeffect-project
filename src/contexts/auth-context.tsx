import React, { FC, useState, useEffect } from "react";

type AuthContextObject = {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
};

export const AuthContext = React.createContext<AuthContextObject>({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

type AuthContextProviderProps = {
  children?: React.ReactNode;
};

export const AuthContextProvider: FC<AuthContextProviderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggingState = localStorage.getItem("isLoggedIn");
    if (loggingState === "1") setIsLoggedIn(true);
  }, []);

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const contextValue: AuthContextObject = {
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
