import { Request, Response } from 'express';

export abstract class Result {
  message: string;
  status: number;

  constructor({ message, status }: { message: string; status: number }) {
    this.message = message;
    this.status = status;
  }

  static transformRequestOnMessage(req: Request) {
    return `${req.method} ${req?.originalUrl}`;
  }
}

export class SuccessResult extends Result {
  data?: any;

  constructor({ message, status, data }: { message: string; status: number; data?: any }) {
    super({ message, status });
    this.data = data;
  }

  handle(res: Response) {
    return res.status(this.status).send(this);
  }
}

export class FailureResult extends Result {
  constructor({ message, status }: { message: string; status: number }) {
    super({ message, status });
  }

  handle(res: Response) {
    return res.status(this.status).json({
      status: this.status,
      message: this.message,
    });
  }
}