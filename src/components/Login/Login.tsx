import React, { FC, useReducer, useEffect, useContext } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Login.module.css";
import { isEmailValid, isPasswordValid } from "../../models/Validators";
import { LoginState, LoginReducer } from "../../models/loginReducer";
import { AuthContext } from "../../contexts/auth-context";

const loginInitialState: LoginState = {
  email: "",
  emailIsValid: null,
  password: "",
  passwordIsValid: null,
  formIsValid: null,
};

const loginReducer: LoginReducer = (state, action) => {
  switch (action.type) {
    case "input":
      switch (action.field) {
        case "email":
          return {
            ...state,
            email: action.payload,
            emailIsValid: isEmailValid(action.payload),
          };
        case "password":
          return {
            ...state,
            password: action.payload,
            passwordIsValid: isPasswordValid(action.payload),
          };
      }
      break;
    case "blur":
      switch (action.field) {
        case "email":
          return {
            ...state,
            emailIsValid: isEmailValid(state.email),
          };
        case "password":
          return {
            ...state,
            passwordIsValid: isPasswordValid(state.password),
          };
      }
      break;
    case "form-validation":
      return {
        ...state,
        formIsValid: state.emailIsValid && state.passwordIsValid,
      };
  }
  return state;
};

const Login: FC = () => {
  const [loginState, dispatchLogin] = useReducer(
    loginReducer,
    loginInitialState
  );

  const authCtx = useContext(AuthContext);

  const { emailIsValid } = loginState;
  const { passwordIsValid } = loginState;

  useEffect(() => {
    dispatchLogin({ type: "form-validation" });
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const email: string = event.target.value.trim();
    dispatchLogin({ type: "input", field: "email", payload: email });
  };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const password: string = event.target.value.trim();
    dispatchLogin({ type: "input", field: "password", payload: password });
  };

  const validateEmailHandler = () =>
    dispatchLogin({ type: "blur", field: "email" });

  const validatePasswordHandler = () =>
    dispatchLogin({ type: "blur", field: "password" });

  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(loginState.email, loginState.password);
  };
  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            loginState.emailIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={loginState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            loginState.passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={loginState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" disabled={!loginState.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
