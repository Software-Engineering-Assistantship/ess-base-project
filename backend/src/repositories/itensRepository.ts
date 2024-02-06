import { Prisma, Item } from '@prisma/client';
import prisma from '@database';

class ItensRepository {
  async create(data: Prisma.ItemCreateInput): Promise<Item> {
    const item = await prisma.item.create({ data });
    return item;
  }

  async findById(id: number): Promise<Item | null> {
    const item = await prisma.item.findUnique({ where: { id } });
    return item;
  }

  async update(id: number, data: Prisma.ItemUpdateInput): Promise<Item> {
    const item = await prisma.item.update({ where: { id }, data });
    return item;
  }

  async delete(id: number): Promise<Item> {
    const item = await prisma.item.delete({ where: { id } });
    return item;
  }

  async findByName(name: string): Promise<Item | null> {
    const item = await prisma.item.findFirst({ where: { name } });
    return item;
  }

  async findAll(): Promise<Item[]> {
    const itens = await prisma.item.findMany();
    return itens;
  }
}

export default new ItensRepository();
