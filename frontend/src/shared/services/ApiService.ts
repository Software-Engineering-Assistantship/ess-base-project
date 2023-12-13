import axios, { AxiosError, AxiosInstance } from "axios";
import { FailureResult, Result, SuccessResult } from "../types/result";
import { AppUnknownError } from "../errors/app-error";
import { HttpError, HttpUnauthorizedError } from "../errors/http-error";
import BaseApiResponseModel from "../models/BaseApiResponseModel";

export class ApiService {
  private httpClient: AxiosInstance;

  constructor({
    httpClient = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    }),
  }: {
    httpClient?: AxiosInstance;
  }) {
    this.httpClient = httpClient;
  }

  get headers() {
    // TODO: add token to headers
    return {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  handleHttpError(error: Error | AxiosError) {
    if (axios.isAxiosError(error)) {
      const httpError: HttpError = HttpError.parseHttpError(error);

      if (httpError instanceof HttpUnauthorizedError) {
        // TODO: handle unauthorized error
      }

      return new FailureResult(httpError);
    }

    return new FailureResult(new AppUnknownError());
  }

  public async get(
    path: string,
    queryParams?: any
  ): Promise<Result<BaseApiResponseModel>> {
    try {
      const response = await this.httpClient.get(path, {
        headers: this.headers,
        params: queryParams,
      });

      const baseApiResponseModel = new BaseApiResponseModel(response.data);

      return new SuccessResult(baseApiResponseModel);
    } catch (e) {
      const error = e as Error | AxiosError;

      return this.handleHttpError(error);
    }
  }

  public async post(
    path: string,
    body: any
  ): Promise<Result<BaseApiResponseModel>> {
    try {
      const response = await this.httpClient.post(path, body, {
        headers: this.headers,
      });

      const baseApiResponseModel = new BaseApiResponseModel(response.data);

      return new SuccessResult(baseApiResponseModel);
    } catch (e) {
      const error = e as Error | AxiosError;

      return this.handleHttpError(error);
    }
  }

  public async update(
    path: string,
    body: any
  ): Promise<Result<BaseApiResponseModel>> {
    try {
      const response = await this.httpClient.put(path, body, {
        headers: this.headers,
      });

      const baseApiResponseModel = new BaseApiResponseModel(response.data);

      return new SuccessResult(baseApiResponseModel);
    } catch (e) {
      const error = e as Error | AxiosError;

      return this.handleHttpError(error);
    }
  }

  public async delete(
    path: string,
    queryParams?: any
  ): Promise<Result<BaseApiResponseModel>> {
    try {
      const response = await this.httpClient.delete(path, {
        headers: this.headers,
        params: queryParams,
      });

      const baseApiResponseModel = new BaseApiResponseModel(response.data);

      return new SuccessResult(baseApiResponseModel);
    } catch (e) {
      const error = e as Error | AxiosError;

      return this.handleHttpError(error);
    }
  }
}
