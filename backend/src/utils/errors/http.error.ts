export abstract class HttpError extends Error {
  msg: string;
  status: number;
  slug: string;

  constructor({
    status,
    msg,
    slug,
  }: {
    status: number;
    msg: string;
    slug?: string;
  }) {
    super(msg);
    this.msg = msg;
    this.status = status;
    this.slug = slug || 'http-error';
  }

  toString() {
    return `[${this.name}]: msg: ${this.msg}, status: ${this.status}, stack: ${this.stack}`;
  }
}

export class HttpBadRequestError extends HttpError {
  constructor({ msg }: { msg: string }) {
    super({ status: 400, msg, slug: 'bad-request' });
  }
}

export class HttpUnauthorizedError extends HttpError {
  constructor({ msg }: { msg: string }) {
    super({ status: 401, msg, slug: 'unauthorized' });
  }
}

export class HttpForbiddenError extends HttpError {
  constructor({ msg }: { msg: string }) {
    super({ status: 403, msg, slug: 'forbidden' });
  }
}

export class HttpNotFoundError extends HttpError {
  constructor({ msg }: { msg: string }) {
    super({ status: 404, msg, slug: 'not-found' });
  }
}

export class HttpConflictError extends HttpError {
  constructor({ msg }: { msg: string }) {
    super({ status: 409, msg, slug: 'conflict' });
  }
}

export class HttpInternalServerError extends HttpError {
  constructor({ msg }: { msg?: string } = {}) {
    super({
      status: 500,
      msg: msg || 'Internal Server Error',
      slug: 'internal-server',
    });
  }
}

export class HttpNotImplementedError extends HttpError {
  constructor({ msg }: { msg?: string } = {}) {
    super({
      status: 501,
      msg: msg || 'Not Implemented Error',
      slug: 'not-implemented',
    });
  }
}