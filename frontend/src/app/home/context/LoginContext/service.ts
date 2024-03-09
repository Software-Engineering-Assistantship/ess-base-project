import { Dispatch } from "react";
import { LoginStateAction } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { LoginFormType } from "../../forms/LoginForm";
import { AppUnknownError } from "../../../../shared/errors/app-error";

export default class LoginService {
  private apiService: ApiService;
  private dispatch: Dispatch<LoginStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<LoginStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async login(loginForm: LoginFormType): Promise<void> {
    this.dispatch({
      type: "CHANGE_LOGIN_REQUEST_STATUS",
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post("/login", loginForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: "CHANGE_LOGIN_REQUEST_STATUS",
          payload: RequestStatus.success(response),
        });
        this.dispatch({
          type: "CHANGE_IS_LOGGED",
          payload: true,
        });
        this.dispatch({
          type: "CHANGE_USER_ID",
          payload: response.data.id,
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: "CHANGE_LOGIN_REQUEST_STATUS",
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async logout(userId: string): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_LOGOUT_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.post(`/login/logout/${userId}`, null);

      result.handle({
        onSuccess: (response) => {
          this.dispatch({
            type: "CHANGE_LOGOUT_REQUEST_STATUS",
            payload: RequestStatus.success(response),
          });
          this.dispatch({
            type: "CHANGE_IS_LOGGED",
            payload: false,
          });
          this.dispatch({
            type: "CHANGE_USER_ID",
            payload: "",
          });
          console.log(response);
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_LOGOUT_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_LOGOUT_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}
