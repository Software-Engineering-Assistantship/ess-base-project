import prisma from '../database';
import { Prisma } from '@prisma/client';
import DuplicateFieldError from '../errors/DuplicateFieldError';
class ClientModel {
  static async insert(
    name: string,
    CPF: string,
    email: string,
    endereco: string,
    password: string
  ) {
    try {
      await prisma.client.create({
        data: {
          name,
          cpf: CPF,
          email,
          endereco,
          password,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta?.target) {
          const targetFields = error.meta.target as string[];
          if (targetFields.includes('email')) {
            throw new DuplicateFieldError('Erro! Email já cadastrado');
          } else if (targetFields.includes('cpf')) {
            throw new DuplicateFieldError('Erro! CPF já cadastrado');
          }
        } else {
          throw error;
        }
      }
    }
  }


  static async index() {
    const clients = await prisma.client.findMany({
      select: { id: true, name: true, cpf: true, email: true,endereco: true,},
    });

    return clients;
  }

  static async delete(id: number) {
    await prisma.client.delete({ where: { id } });
  }

  static async update(
    id: number,
    name: string,
    CPF: string,
    email: string,
    endereco: string,
    password: string
  ) {
    await prisma.client.update({
      where: { id },
      data: { name, cpf: CPF, email, endereco, password },
    });
  }
}

export default ClientModel;