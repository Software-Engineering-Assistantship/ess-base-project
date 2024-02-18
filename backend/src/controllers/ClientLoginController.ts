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
        const token = jwt.sign({ clientId: client.id }, 'chave_secreta_token', { expiresIn: '18h' });

        res.status(200).json({ message: 'Login bem sucedido', header:token });
        //res.locals = { data: {token} };
        //res.status(200).json({ message: 'Login bem sucedido', token });
      }
    } catch (error: any) {
      res.status(401).json({ error: 'Login falhou' });
    }
  }

  static async verifyToken(req: Request, res: Response, next: Function) {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(401).json({ error: 'Token de autorização não fornecido' });
    }

    try {
      const token = authToken.split(' ')[1]; // Excluindo o prefixo 'Bearer' do token
      const decodedToken: any = jwt.verify(token, 'chave_secreta_token');
      //req.userId = decodedToken.clientId;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token de autorização inválido' });
    }
  }
}

export default ClientLoginController;