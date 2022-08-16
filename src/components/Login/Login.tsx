import React, { FC, useState, useReducer } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Login.module.css";
import { isEmailValid, isPasswordValid } from "../../models/Validators";
import * as LoginReducer from "../../models/loginReducer";

const emailInitialState: LoginReducer.EmailReducerState = {
  value: "",
  isValid: null,
};

const passInitialState: LoginReducer.PassReducerState = {
  value: "",
  isValid: null,
};

const emailReducer: LoginReducer.EmailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const newEmailState: LoginReducer.EmailReducerState = {
      value: action.value ?? "",
      isValid: isEmailValid(action.value ?? ""),
    };
    return newEmailState;
  } else if (action.type === "INPUT_BLUR") {
    const newEmailState: LoginReducer.EmailReducerState = {
      value: state.value,
      isValid: isEmailValid(state.value),
    };
    return newEmailState;
  }
  return state;
};

const passReducer: LoginReducer.PassReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const newPassState: LoginReducer.PassReducerState = {
      value: action.value ?? "",
      isValid: isPasswordValid(action.value ?? ""),
    };
    return newPassState;
  } else if (action.type === "INPUT_BLUR") {
    const newPassState: LoginReducer.PassReducerState = {
      value: state.value,
      isValid: isPasswordValid(state.value),
    };
    return newPassState;
  }
  return state;
};

type LoginProps = {
  onLogin: (email: string, password: string) => void;
};

const Login: FC<LoginProps> = (props) => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    emailInitialState
  );

  const [passState, dispatchPass] = useReducer(passReducer, passInitialState);

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const email: string = event.target.value.trim();
    dispatchEmail({ type: "USER_INPUT", value: email });

    setFormIsValid(isEmailValid(email) && !!passState.isValid);
  };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const password: string = event.target.value.trim();
    dispatchPass({ type: "USER_INPUT", value: password });

    setFormIsValid(!!emailState.isValid && isPasswordValid(password));
  };

  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });

  const validatePasswordHandler = () => dispatchPass({ type: "INPUT_BLUR" });

  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };
  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
