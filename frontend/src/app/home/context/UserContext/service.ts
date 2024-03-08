import { Dispatch } from "react";
import { UserStateAction } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { UserFormType } from "../../forms/UserForm";
import { UserUpdateFormType } from "../../forms/UserUpdateForm";
import UserModel from "../../models/UserModel";
import { AppUnknownError } from "../../../../shared/errors/app-error";

export default class UserService {
  private apiService: ApiService;
  private dispatch: Dispatch<UserStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<UserStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async createUser(userForm: UserFormType): Promise<void> {
    this.dispatch({
      type: "CHANGE_CREATE_USER_REQUEST_STATUS",
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post("/users/cadastro", userForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: "CHANGE_CREATE_USER_REQUEST_STATUS",
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: "CHANGE_CREATE_USER_REQUEST_STATUS",
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getUsers(): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_GET_USER_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get("/users");

      result.handle({
        onSuccess: (response) => {
          const users = response.data.map((user: any) => new UserModel(user));

          this.dispatch({
            type: "CHANGE_GET_USER_REQUEST_STATUS",
            payload: RequestStatus.success(users),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_GET_USER_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_GET_USER_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async getUser(userId: string): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_GET_USER_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(`/users/${userId}`);

      result.handle({
        onSuccess: (response) => {
          const user = new UserModel(response.data);

          this.dispatch({
            type: "CHANGE_GET_USER_REQUEST_STATUS",
            payload: RequestStatus.success([user]),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_GET_USER_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_GET_USER_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async updateUser(userForm: UserUpdateFormType, userId: string): Promise<void> {
    this.dispatch({
      type: "CHANGE_UPDATE_USER_REQUEST_STATUS",
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.update(`/users/${userId}`, userForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: "CHANGE_UPDATE_USER_REQUEST_STATUS",
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: "CHANGE_UPDATE_USER_REQUEST_STATUS",
          payload: RequestStatus.failure(error),
        });
      },
    });
  }
}
