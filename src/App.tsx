import React, { useState } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import { LoginEventHandler, LogoutEventHandler } from "./models/eventHandlers";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loginHandler: LoginEventHandler = (email, password) => {
    setIsLoggedIn(true);
  };

  const logoutHandler: LogoutEventHandler = () => {
    setIsLoggedIn(false);
  }

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
