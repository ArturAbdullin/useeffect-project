type EmailState = {
  email: string;
  emailIsValid: boolean | null;
};

type PasswordState = {
  password: string;
  passwordIsValid: boolean | null;
};

type FormState = {
  formIsValid: boolean | null;
};

export type LoginState = EmailState & PasswordState & FormState;

type LoginActionCommon = {
  type: string;
};

type LoginField = "email" | "password";

type LoginActionInput = LoginActionCommon & {
  type: "input";
  field: LoginField;
  payload: string;
};

type LoginActionBlur = LoginActionCommon & {
  type: "blur";
  field: LoginField;
};

type LoginActionFormValidation = LoginActionCommon & {
  type: "form-validation"
}

export type LoginAction = LoginActionInput | LoginActionBlur | LoginActionFormValidation;

export type LoginReducer = (
  state: LoginState,
  action: LoginAction
) => LoginState;
