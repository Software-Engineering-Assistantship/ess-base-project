import { Request, Response } from 'express';
import ClientLoginModel from '../models/ClientLoginModel';
import DuplicateFieldError from '../errors/DuplicateFieldError';
//import { body, validationResult } from 'express-validator';
//import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class ClientLoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { status, client } = await ClientLoginModel.authenticate(email, password);
      if (status === 'OK') {
        // Geração do token de autenticação
        const token = jwt.sign({ clientId: client.id }, process.env.JWT_SECRET as string , { expiresIn: '18h' });
        //console.log(token + token);
        //console.log(req.body);

        res.status(200).json({ message: 'Login bem sucedido', header: token });
        //res.locals = { data: {token} };
        //res.status(200).json({ message: 'Login bem sucedido', token });
      }
    } catch (error: any) {
      res.status(401).json({ error: 'Login falhou' });
    }
  }

  static async verifyToken(req: Request, res: Response, next: Function) {
    //console.log(req.body);
    const authToken = req.body.header;
    if (!authToken) {
      return res.status(401).json({ error: 'Token de autorização não fornecido' });
    }

    try {
      const token = authToken.split(' ')[1]; // Excluindo o prefixo 'Bearer' do token
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
      //req.userId = decodedToken.clientId;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token de autorização inválido' });
    }
  }
}

export default ClientLoginController;