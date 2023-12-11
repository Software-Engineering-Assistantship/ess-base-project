import { HomeState, HomeStateAction } from "./types";

const homeStateReducer = (state: HomeState, action: HomeStateAction) => {
  switch (action.type) {
    case "CHANGE_CREATE_TEST_REQUEST_STATUS":
      return {
        ...state,
        createTestRequestStatus: action.payload,
      };
    case "CHANGE_GET_TESTS_REQUEST_STATUS":
      return {
        ...state,
        getTestsRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default homeStateReducer;
