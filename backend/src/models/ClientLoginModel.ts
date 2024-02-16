import prisma from '../database';
import { Prisma } from '@prisma/client';
import DuplicateFieldError from '../errors/DuplicateFieldError';
import bcrypt from 'bcrypt'; //hash de senhas e comparação

class ClientLoginModel{
  static async authenticate (
    email: string,
    password: string
    ) {
    const client = await prisma.client.findUnique({where: {email}});
    if (!client)
    {
      throw new Error('Login e/ou senha incorretos');
    }

    const passwordIsCorrect = await bcrypt.compare(password, client.password);
    if (!passwordIsCorrect)
    {
      throw new Error('Login e/ou senha incorretos');
    }

    return { status: 'OK', client };}
}

export default ClientLoginModel;