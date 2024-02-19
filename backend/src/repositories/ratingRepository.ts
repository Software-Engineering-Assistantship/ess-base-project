import prisma from '@database';
import { Prisma, Rating, Item } from '@prisma/client';

class RatingRepository {
    async create(data: Rating): Promise<Rating> {
        const rating = await prisma.rating.create({ data });
        return rating;
    }

    async findById(id: number): Promise<Item | null> {
        const item = await prisma.item.findUnique({ where: { id } });
        return item;
    }

    async update(id: number, data: Prisma.RatingUpdateInput): Promise<Rating> {
        const rating = await prisma.rating.update({ where: { id }, data });
        return rating;
      }

    async delete(id: number): Promise<Rating> {
        const rating = await prisma.rating.delete({ where: { id } });
        return rating;
    }

    async findAll(): Promise<Rating[]> {
        const rating = await prisma.rating.findMany();
        return rating;
    }
}

export default new RatingRepository();