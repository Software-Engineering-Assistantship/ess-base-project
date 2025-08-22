import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodType } from 'zod';

enum HttpStatusCode {
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}

export function validateData(schema: ZodType<any, any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => {
          const isRequiredError = issue.code === "invalid_type" && issue.message === "Required";
          return isRequiredError ? `${issue.path.join('.')} is required` : issue.message;
        });

        res.status(HttpStatusCode.BAD_REQUEST).json({ status: 400, message: errorMessages });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}
