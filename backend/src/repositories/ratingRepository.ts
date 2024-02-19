import prisma from '@database';
import { Prisma, Rating } from '@prisma/client';

class RatingRepository {
    async create(data: Rating): Promise<Rating> {
        const rating = await prisma.rating.create({ data });
        return rating;
    }

    async findById(id: number): Promise<Rating | null> {
        const rating = await prisma.rating.findUnique({ where: { id } });
        return rating;
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