import prisma from '@database';
import { Prisma, DeliveryPerson, Address } from '@prisma/client';
import deliveryPerson from '../controllers/deliveryPerson';

class DeliveryPersonRepository {
  async create(
    data: Prisma.DeliveryPersonCreateInput,
  ): Promise<DeliveryPerson> {
    const deliveryPerson = await prisma.deliveryPerson.create({ data });
    return deliveryPerson;
  }
  async createAddress(
    data: Prisma.AddressCreateInput,
  ): Promise<Address | null> {
    const address = await prisma.address.create({ data });
    return address;
  }

  async findBycpf(cpf: string): Promise<DeliveryPerson | null> {
    const deliveryPerson = await prisma.deliveryPerson.findUnique({
      where: { cpf },
      include: { address: true },
    });
    return deliveryPerson;
  }

  async findAddressByCpf(userId: string): Promise<Address | null> {
    const address = await prisma.address.findUnique({
      where: { userId },
    });
    return address;
  }
  async update(
    cpf: string,
    data: Prisma.DeliveryPersonUncheckedUpdateInput,
  ): Promise<DeliveryPerson> {
    const user = await prisma.deliveryPerson.update({ where: { cpf }, data });
    return user;
  }
  async updateAddress(
    cpf: string,
    addressData: Prisma.AddressUncheckedUpdateInput,
  ): Promise<Address | null> {
    const updatedAddress = await prisma.address.update({
      where: { userId: cpf },
      data: addressData,
    });
    return updatedAddress;
  }
}
export default new DeliveryPersonRepository();
