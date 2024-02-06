import prisma from '@database';
import { Prisma, DeliveryPerson } from '@prisma/client';

class DeliveryPersonRepository {
  async create(
    data: Prisma.DeliveryPersonCreateInput,
  ): Promise<DeliveryPerson> {
    const deliveryPerson = await prisma.deliveryPerson.create({ data });
    return deliveryPerson;
  }

  async findBycpf(cpf: string): Promise<DeliveryPerson | null> {
    const deliveryPerson = await prisma.deliveryPerson.findUnique({
      where: { cpf },
    });
    return deliveryPerson;
  }

  async findByName(name: string): Promise<DeliveryPerson[] | null> {
    const deliveryPerson = await prisma.deliveryPerson.findMany({
      where: { name },
    });
    return deliveryPerson;
  }
  async update(
    cpf: string,
    data: Prisma.DeliveryPersonUpdateInput,
  ): Promise<DeliveryPerson> {
    const user = await prisma.deliveryPerson.update({ where: { cpf }, data });
    return user;
  }
}
export default new DeliveryPersonRepository();
