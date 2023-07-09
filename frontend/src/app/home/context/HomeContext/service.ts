import { Dispatch } from "react";
import { HomeStateAction } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { TestFormType } from "../../forms/TestForm";
import TestModel from "../../models/TestModel";
import { AppUnknownError } from "../../../../shared/errors/app-error";

export default class HomeService {
  private apiService: ApiService;
  private dispatch: Dispatch<HomeStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<HomeStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async createTest(testForm: TestFormType): Promise<void> {
    this.dispatch({
      type: "CHANGE_CREATE_TEST_REQUEST_STATUS",
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post("/tests", testForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: "CHANGE_CREATE_TEST_REQUEST_STATUS",
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: "CHANGE_CREATE_TEST_REQUEST_STATUS",
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getTests(): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_GET_TESTS_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get("/tests");

      result.handle({
        onSuccess: (response) => {
          const tests = response.data.map((test: any) => new TestModel(test));

          this.dispatch({
            type: "CHANGE_GET_TESTS_REQUEST_STATUS",
            payload: RequestStatus.success(tests),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_GET_TESTS_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_GET_TESTS_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}
