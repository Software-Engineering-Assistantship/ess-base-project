import { Request, Response } from 'express';
import RestaurantModel from '../models/RestaurantModel';
import DuplicateFieldError from '../errors/DuplicateFieldError';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

class RestaurantController {
  static async insert(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const { name, CNPJ, email, password } = req.body;

    bcrypt.hash(password, 10).then(async (encryptedPassword) => {
      try {
        await RestaurantModel.insert(name, CNPJ, email, encryptedPassword);
        return res.status(201).json({ message: 'Restaurant created' });
      } catch (error: any) {
        if (error instanceof DuplicateFieldError) {
          return res.status(error.statusCode).json({ message: error.message });
        }
      }
    });
  }

  static async index(req: Request, res: Response) {
    try {
      const resData = await RestaurantModel.index();
      return res.status(200).json(resData);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await RestaurantModel.delete(Number(id));
      return res.status(200).json({ message: 'Restaurant deleted' });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const { id } = req.params;
    const { name, CNPJ, email, password } = req.body;

    try {
      await RestaurantModel.update(Number(id), name, CNPJ, email, password);
      return res.status(200).json({ message: 'Restaurant updated' });
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }

  static validate(method: string) {
    switch (method) {
      case 'insert': {
        return [
          body('name', "Campo 'nome' inválido'").exists().notEmpty(),
          body('CNPJ', "Campo 'CNPJ' inválido'")
            .exists()
            .notEmpty()
            .matches(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/),
          body('email', "Campo 'email' inválido'").exists().isEmail(),
        ];
      }
      case 'update': {
        return [
          body('name', "Campo 'nome' inválido'").notEmpty().optional(),
          body('CNPJ', "Campo 'CNPJ' inválido'")
            .optional()
            .notEmpty()
            .matches(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/),
          body('email', "Campo 'email' inválido'").isEmail().optional(),
        ];
      }
      default:
        return [];
    }
  }
}

export default RestaurantController;
