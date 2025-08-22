import prisma from '../database';
import { Prisma } from '@prisma/client';
import DuplicateFieldError from '../errors/DuplicateFieldError';
import NotFoundError from '../errors/NotFoundError';
import { throws } from 'assert';
import { error } from 'console';
class ClientModel {
  static async insert(
    password : string,
    name : string,
    cpf : string,
    email : string,
    address : string
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
          password,
          name,
          cpf,
          email,
          address,
        },
      });
     
  }

  static async index() {
    const clients = await prisma.client.findMany({
      select: { id: true, name: true, cpf: true, email: true, address: true },
    });

    return clients;
  }

  static async delete(id: number) {
    await prisma.client.delete({ where: { id } });
  }

  static async update(
    id: number,
    password : string,
    name : string,
    cpf : string,
    email : string,
    address : string
  ) {
    const existingClient = await prisma.client.findFirst({
      where: {
        OR: [{ cpf }, { email }],
      },
    });

    if (existingClient) {
      throw new DuplicateFieldError('Cliente já registrado');
    }

    const client = await prisma.client.findFirst({ where: { id } });

    if (!client) throw new NotFoundError('Restaurant not found');

    await prisma.client.update({
      where: { id },
      data: { password, name, cpf, email, address },
    });
  }
}

export default ClientModel;
