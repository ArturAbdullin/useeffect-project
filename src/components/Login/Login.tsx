import React, { FC, useEffect, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Login.module.css";
import { isEmailValid, isPasswordValid } from "../../models/Validators";

type LoginProps = {
  onLogin: (email: string, password: string) => void;
};

const Login: FC<LoginProps> = (props) => {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>();
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    const formValidationTimeout = setTimeout(() => {
      console.log('checking validity');
      setFormIsValid(
        isEmailValid(enteredEmail) && isPasswordValid(enteredPassword)
      );
    }, 500);
    return () => {
      console.log('cleanup');
      clearTimeout(formValidationTimeout);
    }
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setEnteredEmail(event.target.value.trim());
  };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setEnteredPassword(event.target.value.trim());
  };

  const validateEmailHandler = () =>
    setEmailIsValid(isEmailValid(enteredEmail));

  const validatePasswordHandler = () =>
    setPasswordIsValid(isPasswordValid(enteredPassword));

  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };
  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
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
