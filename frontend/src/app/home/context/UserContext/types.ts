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
    }
  | {
      type: "CHANGE_UPDATE_USER_REQUEST_STATUS";
      payload: RequestStatus<any>;
    };

export interface UserState {
  createUserRequestStatus: RequestStatus<any>;
  getUserRequestStatus: RequestStatus<UserModel[]>;
  updateUserRequestStatus: RequestStatus<any>;
}
