import prisma from '../database';
import { Prisma } from '@prisma/client';
import DuplicateFieldError from '../errors/DuplicateFieldError';
import { throws } from 'assert';
import { error } from 'console';
class ClientModel {
  static async insert(
    name: string,
    cpf: string,
    email: string,
    endereco: string,
    password: string
  ) {
      const Exist_Client = await prisma.client.findFirst({
        where: {
          OR : [{cpf},{email}]
        },
      });

      if(Exist_Client){
        throw new DuplicateFieldError("Cliente já cadastrado");
      }

      await prisma.client.create({
        data: {
          name,
          cpf,
          email,
          endereco,
          password,
        },
      });
     
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