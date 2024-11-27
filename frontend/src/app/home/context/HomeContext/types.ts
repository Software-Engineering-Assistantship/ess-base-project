import RequestStatus from "../../../../shared/types/request-status";
import TestModel from "../../models/TestModel";

export type HomeStateAction =
  | {
      type: "CHANGE_CREATE_TEST_REQUEST_STATUS";
      payload: RequestStatus<any>;
    }
  | {
      type: "CHANGE_GET_TESTS_REQUEST_STATUS";
      payload: RequestStatus<TestModel[]>;
    };

export interface HomeState {
  createTestRequestStatus: RequestStatus<any>;
  getTestsRequestStatus: RequestStatus<TestModel[]>;
}
