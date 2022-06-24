import { AnyAction } from "redux";

const initialState = {
  checking: true,
  button: true,
};

export const types = {
  authCheckingFinish: "[auth] Finish checking login state",
  authLogin: "[auth] Login",
  authLogout: "[auth] Logout",
};
export const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        checking: false,
        button: true,
        ...action.payload,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };

    case types.authLogout:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
