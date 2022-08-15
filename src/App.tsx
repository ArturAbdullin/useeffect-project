import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import { LoginEventHandler, LogoutEventHandler } from "./models/eventHandlers";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggingState = localStorage.getItem("isLoggedIn");
    if (loggingState === "1") setIsLoggedIn(true);
  }, []);

  const loginHandler: LoginEventHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler: LogoutEventHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      <MainHeader isLoggedIn={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
