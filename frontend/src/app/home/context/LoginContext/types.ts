import RequestStatus from "../../../../shared/types/request-status";

export type LoginStateAction =
    {
      type: "CHANGE_LOGIN_REQUEST_STATUS";
      payload: RequestStatus<any>;
    }
  | {
      type: "CHANGE_LOGOUT_REQUEST_STATUS";
      payload: RequestStatus<any>;
    };

export interface LoginState {
  loginRequestStatus: RequestStatus<any>;
  logoutRequestStatus: RequestStatus<any>;
}
