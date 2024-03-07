import { UserState, UserStateAction } from "./types";

const userStateReducer = (state: UserState, action: UserStateAction) => {
  switch (action.type) {
    case "CHANGE_CREATE_USER_REQUEST_STATUS":
      return {
        ...state,
        createUserRequestStatus: action.payload,
      };
    case "CHANGE_GET_USER_REQUEST_STATUS":
      return {
        ...state,
        getUserRequestStatus: action.payload,
      };
    case "CHANGE_UPDATE_USER_REQUEST_STATUS":
      return {
        ...state,
        updateUserRequestStatus: action.payload,
      };
    default:
      return state;
  }
};

export default userStateReducer;
