import { AxiosError } from "axios";

import { AppError } from "./app-error";
import BaseApiResponseModel from "../models/BaseApiResponseModel";

abstract class HttpError extends AppError {
  public readonly statusCode: number;

  protected constructor(
    slug: string,
    message: string,
    stackTrace: string,
    statusCode = -1
  ) {
    super(slug, message, stackTrace);
    this.statusCode = statusCode;
  }

  toString = (): string =>
    `[${this.constructor.name}]: \nslug: ${this.slug}, \nmessage: ${this.message}, \nstackTrace: ${this.stackTrace}, \nstatusCode: ${this.statusCode}`;

  static parseHttpError(error: AxiosError) {
    let msg = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    const slug = error.response?.statusText;

    if (error.response?.data) {
      const baseApiResponseModel = new BaseApiResponseModel(
        error.response?.data as any
      );

      msg = HttpError.mapMsgCodeToMessage(baseApiResponseModel.msgCode);
    }

    switch (error.response?.status) {
      case 400:
        return new HttpBadRequestError({
          slug: slug,
          message: msg,
        });
      case 401:
        return new HttpUnauthorizedError({
          slug: slug,
          message: msg,
        });
      case 403:
        return new HttpForbiddenError({
          slug: slug,
          message: msg,
        });
      case 404:
        return new HttpNotFoundError({
          slug: slug,
          message: msg,
        });
      case 410:
        return new HttpGoneError({
          slug: slug,
          message: msg,
        });
      case 500:
        return new HttpInternalServerError({
          slug: slug,
          message: msg,
        });
      default:
        return new HttpUnknownError({
          slug: slug,
          message: msg,
        });
    }
  }

  static mapMsgCodeToMessage(msgCode: string): string {
    switch (msgCode) {
      case "test_not_found":
        return "Teste não encontrado.";
      default:
        return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    }
  }
}

class HttpUnknownError extends HttpError {
  constructor({
    slug = "unknown",
    message = "Unknown error",
    stackTrace = "",
  }) {
    super(slug, message, stackTrace);
  }
}

class HttpBadRequestError extends HttpError {
  constructor({
    slug = "bad_request",
    message = "Bad request",
    stackTrace = "",
  }) {
    super(slug, message, stackTrace, 400);
  }
}

class HttpUnauthorizedError extends HttpError {
  constructor({
    slug = "unauthorized",
    message = "Unauthorized",
    stackTrace = "",
  }) {
    super(slug, message, stackTrace, 401);
  }
}

class HttpForbiddenError extends HttpError {
  constructor({ slug = "forbidden", message = "Forbidden", stackTrace = "" }) {
    super(slug, message, stackTrace, 403);
  }
}

class HttpNotFoundError extends HttpError {
  constructor({ slug = "not_found", message = "Not found", stackTrace = "" }) {
    super(slug, message, stackTrace, 404);
  }
}

class HttpGoneError extends HttpError {
  constructor({ slug = "gone", message = "Gone", stackTrace = "" }) {
    super(slug, message, stackTrace, 410);
  }
}

class HttpInternalServerError extends HttpError {
  constructor({
    slug = "internal_server_error",
    message = "Internal server error",
    stackTrace = "",
  }) {
    super(slug, message, stackTrace, 500);
  }
}

export {
  HttpError,
  HttpUnknownError,
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpForbiddenError,
  HttpNotFoundError,
  HttpGoneError,
  HttpInternalServerError,
};
