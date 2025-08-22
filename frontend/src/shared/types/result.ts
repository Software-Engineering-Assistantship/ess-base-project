import { AppError, AppUnknownError } from "../errors/app-error";

export class Result<T> {
  handle(callbacks: {
    onSuccess: (result: T) => any;
    onFailure: (result: AppError) => any;
  }): any {
    if (this instanceof SuccessResult) {
      return callbacks.onSuccess(this.data);
    } else if (this instanceof FailureResult) {
      return callbacks.onFailure(this.error);
    }
  }
}

export class SuccessResult<T> extends Result<T> {
  data: T;
  constructor(data: T) {
    super();
    this.data = data;
  }
}

export class FailureResult<T> extends Result<T> {
  error: AppError;
  constructor(error: AppError = new AppUnknownError()) {
    super();
    this.error = error;
  }
}
