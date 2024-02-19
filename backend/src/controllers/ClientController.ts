import { Request, Response } from 'express';

import DuplicateFieldError from '../errors/DuplicateFieldError';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import ClientModel from '../models/ClientModel';

class ClientController {
  static async insert(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const {password, name, cpf, email, address} = req.body;

    bcrypt.hash(password, 10).then(async (encryptedPassword) => {
      try {
        await ClientModel.insert(encryptedPassword, name, cpf, email, address);
        return res.status(201).json({ message: 'Client created' });
      } catch (error: any) {
        if (error instanceof DuplicateFieldError) {
          return res.status(error.statusCode).json({ message: error.message });
        }
      }
    });
  }

  static async index(req: Request, res: Response) {
    try {
      const resData = await ClientModel.index();
      return res.status(200).json(resData);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await ClientModel.delete(Number(id));
      return res.status(200).json({ message: 'Client deleted' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const { id } = req.params;
    const { password, name, cpf, email, address } = req.body;

    try {
      await ClientModel.update(Number(id), password, name, cpf, email, address);
      return res.status(200).json({ message: 'Client updated' });
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }

  static validate(method: string) {
    switch (method) {
      case 'insert': {
        return [
          body('name', "Campo 'nome' inválido'").exists().notEmpty(),
          body('cpf', "Campo 'CPF' inválido'")
            .exists()
            .notEmpty()
            .matches(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/),
          body('email', "Campo 'email' inválido'").exists().isEmail(),
              ];
      }
      case 'update': {
        return [
          body('name', "Campo 'nome' inválido'").notEmpty().optional(),
          body('cpf', "Campo 'CPF' inválido'")
            .optional()
            .notEmpty()
            .matches(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/),
          body('email', "Campo 'email' inválido'").isEmail().optional(),
            ];
      }
      default:
        return [];
    }
  }
}

export default ClientController;
