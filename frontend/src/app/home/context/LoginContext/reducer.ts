import { LoginState, LoginStateAction } from "./types";

const loginStateReducer = (state: LoginState, action: LoginStateAction) => {
  switch (action.type) {
    case "CHANGE_LOGIN_REQUEST_STATUS":
      return {
        ...state,
        loginRequestStatus: action.payload,
      };
    case "CHANGE_LOGOUT_REQUEST_STATUS":
      return {
        ...state,
        logoutRequestStatus: action.payload,
      };
    default:
      return state;
  }
};

export default loginStateReducer;
