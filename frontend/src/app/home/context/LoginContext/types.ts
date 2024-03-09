import RequestStatus from "../../../../shared/types/request-status";

export type LoginStateAction =
  | {
      type: "CHANGE_LOGIN_REQUEST_STATUS";
      payload: RequestStatus<any>;
    }
  | {
      type: "CHANGE_LOGOUT_REQUEST_STATUS";
      payload: RequestStatus<any>;
    }
  | {
      type: "CHANGE_IS_LOGGED";
      payload: boolean;
    }
  | {
      type: "CHANGE_USER_ID";
      payload: string;
    };

export interface LoginState {
  loginRequestStatus: RequestStatus<any>;
  logoutRequestStatus: RequestStatus<any>;
  isLogged: boolean;
  userId: string;
}