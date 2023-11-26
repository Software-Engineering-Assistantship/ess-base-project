export abstract class HttpError extends Error {
  msg: string;
  status: number;
  msgCode: any;
  slug: string;

  constructor({
    status,
    msg,
    msgCode,
    slug,
  }: {
    status: number;
    msg: string;
    msgCode?: any;
    slug?: string;
  }) {
    super(msg);
    this.msg = msg;
    this.status = status;
    this.msgCode = msgCode || 'failure';
    this.slug = slug || 'http-error';
  }

  toString() {
    return `[${this.name}]: msg: ${this.msg}, msgCode: ${this.msgCode}, status: ${this.status}, stack: ${this.stack}`;
  }
}

export class HttpBadRequestError extends HttpError {
  constructor({ msg, msgCode }: { msg: string; msgCode?: any }) {
    super({ status: 400, msg, msgCode, slug: 'bad-request' });
  }
}

export class HttpUnauthorizedError extends HttpError {
  constructor({ msg, msgCode }: { msg: string; msgCode?: any }) {
    super({ status: 401, msg, msgCode, slug: 'unauthorized' });
  }
}

export class HttpForbiddenError extends HttpError {
  constructor({ msg, msgCode }: { msg: string; msgCode?: any }) {
    super({ status: 403, msg, msgCode, slug: 'forbidden' });
  }
}

export class HttpNotFoundError extends HttpError {
  constructor({ msg, msgCode }: { msg: string; msgCode?: any }) {
    super({ status: 404, msg, msgCode, slug: 'not-found' });
  }
}

export class HttpInternalServerError extends HttpError {
  constructor({ msg, msgCode }: { msg?: string; msgCode?: any } = {}) {
    super({
      status: 500,
      msg: msg || 'Internal Server Error',
      msgCode,
      slug: 'internal-server',
    });
  }
}

export class HttpNotImplementedError extends HttpError {
  constructor({ msg, msgCode }: { msg?: string; msgCode?: any } = {}) {
    super({
      status: 501,
      msg: msg || 'Not Implemented Error',
      msgCode,
      slug: 'not-implemented',
    });
  }
}
