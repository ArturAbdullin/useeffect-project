import React, { useState } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import { LoginEventHandler } from "./models/eventHandlers";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loginHandler: LoginEventHandler = (email, password) => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <MainHeader isLoggedIn={isLoggedIn} onLogout={() => {}} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
