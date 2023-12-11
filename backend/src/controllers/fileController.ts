import { NextFunction, Request, Response } from 'express';
import { FileRepository } from '@repositories';

class FileController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return next({
          status: 400,
          message: 'Sem arquivo.',
        });
      }
      const url = await FileRepository.uploadFile({
        Body: req.file.buffer,
        Key: req.file.originalname,
      });

      res.locals = {
        status: 200,
        data: url,
        message: 'Arquivo salvo.',
      };

      return next();
    } catch (err) {
      return next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;

      await FileRepository.deleteFile(key);

      res.locals = {
        status: 200,
        message: 'Arquivo deletado.',
      };

      return next();
    } catch (err) {
      return next(err);
    }
  }
}

export default new FileController();
