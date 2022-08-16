export type EmailReducerState = {
  value: string;
  isValid: boolean | null;
};

export type EmailReducerAction = {
  type: "USER_INPUT" | "INPUT_BLUR";
  value?: string;
};

export type EmailReducer = (
  state: EmailReducerState,
  action: EmailReducerAction
) => EmailReducerState;

export type PassReducerState = {
  value: string;
  isValid: boolean | null;
};

export type PassReducerAction = {
  type: "USER_INPUT" | "INPUT_BLUR";
  value?: string;
};

export type PassReducer = (
  state: PassReducerState,
  action: PassReducerAction
) => PassReducerState;
