import { Request, Response } from 'express';
import RestaurantModel from '../models/RestaurantModel';
import DuplicateFieldError from '../errors/DuplicateFieldError';

class RestaurantController {
  static async insert(req: Request, res: Response) {
    const { name, CNPJ, email } = req.body;

    console.log(name, CNPJ, email);

    try {
      await RestaurantModel.insert(name, CNPJ, email);
      return res.status(201).json({ message: 'Restaurant created' });
    } catch (error: any) {
      if (error instanceof DuplicateFieldError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const resData = await RestaurantModel.index();
      return res.status(200).json(resData);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default RestaurantController;
