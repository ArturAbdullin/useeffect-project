import React, { FC, useReducer, useEffect, useContext, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Login.module.css";
import { isEmailValid, isPasswordValid } from "../../models/Validators";
import { LoginState, LoginReducer } from "../../models/loginReducer";
import { AuthContext } from "../../contexts/auth-context";
import Input from "../UI/Input";

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

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    if (loginState.formIsValid) {
      authCtx.onLogin(loginState.email, loginState.password);
    } else if (!loginState.emailIsValid) {
      dispatchLogin({ type: "blur", field: "email" });
      emailInputRef.current?.focus();
    } else {
      dispatchLogin({ type: "blur", field: "password" });
      passwordInputRef.current?.focus();
    }
  };
  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          value={loginState.email}
          label="E-Mail"
          isValid={loginState.emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
        ref={passwordInputRef}
          type="password"
          id="password"
          value={loginState.password}
          label="Password"
          isValid={loginState.passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={styles.actions}>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
