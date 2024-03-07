import RequestStatus from "../../../../shared/types/request-status";
import UserModel from "../../models/UserModel";

export type UserStateAction =
  | {
      type: "CHANGE_CREATE_USER_REQUEST_STATUS";
      payload: RequestStatus<any>;
    }
  | {
      type: "CHANGE_GET_USER_REQUEST_STATUS";
      payload: RequestStatus<UserModel[]>;
    };

export interface UserState {
  createUserRequestStatus: RequestStatus<any>;
  getUserRequestStatus: RequestStatus<UserModel[]>;
}
