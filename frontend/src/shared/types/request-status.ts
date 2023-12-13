import { RequestStatusEnum } from "../enums/request-status.enum";
import { AppError } from "../errors/app-error";

export default class RequestStatus<T, E = AppError> {
  status: RequestStatusEnum;

  constructor(status: RequestStatusEnum = RequestStatusEnum.Idle) {
    this.status = status;
  }

  isIdle(): boolean {
    return this.status === RequestStatusEnum.Idle;
  }

  isLoading(): boolean {
    return this.status === RequestStatusEnum.Loading;
  }

  isSuccess(): boolean {
    return this.status === RequestStatusEnum.Succeeded;
  }

  isFailure(): boolean {
    return this.status === RequestStatusEnum.Failed;
  }

  static idle<T>(): RequestStatusIdle<T> {
    return new RequestStatusIdle();
  }

  static loading<T>(): RequestStatusLoading<T> {
    return new RequestStatusLoading();
  }

  static success<T>(data: T): RequestStatusSuccess<T> {
    return new RequestStatusSuccess<T>(data);
  }

  static failure<E>(error: E): RequestStatusFailure<E> {
    return new RequestStatusFailure<E>(error);
  }

  maybeMap<K>({
    idle,
    loading,
    succeeded,
    failed,
    orElse,
  }: {
    idle?: () => K;
    loading?: () => K;
    succeeded?: (data: T) => K;
    failed?: (error: E) => K;
    orElse?: () => K;
  }): K {
    switch (this.status) {
      case RequestStatusEnum.Idle:
        return idle ? idle() : (undefined as unknown as K);
      case RequestStatusEnum.Loading:
        return loading ? loading() : (undefined as unknown as K);
      case RequestStatusEnum.Succeeded:
        if (this instanceof RequestStatusSuccess) {
          return succeeded ? succeeded(this.data) : (undefined as unknown as K);
        } else {
          return undefined as unknown as K;
        }
      case RequestStatusEnum.Failed:
        if (this instanceof RequestStatusFailure) {
          return failed ? failed(this.error) : (undefined as unknown as K);
        } else {
          return undefined as unknown as K;
        }
      default:
        return orElse ? orElse() : (undefined as unknown as K);
    }
  }
}

class RequestStatusIdle<T> extends RequestStatus<T> {
  constructor() {
    super();
  }
}

class RequestStatusLoading<T> extends RequestStatus<T> {
  constructor() {
    super(RequestStatusEnum.Loading);
  }
}

class RequestStatusSuccess<T> extends RequestStatus<T> {
  data: T;

  constructor(data: T) {
    super(RequestStatusEnum.Succeeded);
    this.data = data;
  }
}

class RequestStatusFailure<E> extends RequestStatus<unknown, E> {
  error: E;

  constructor(error: E) {
    super(RequestStatusEnum.Failed);
    this.error = error;
  }
}
