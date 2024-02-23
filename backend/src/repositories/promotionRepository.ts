import { Prisma, Promotion } from '@prisma/client';
import prisma from '@database';

class PromotionRepository {
    async create(data: Prisma.PromotionCreateInput): Promise<Promotion> {
        const promotion = await prisma.promotion.create({ data });
        return promotion;
    }

    async findById(id: number): Promise<Promotion | null> {
        const promotion = await prisma.promotion.findUnique({ where: { id } });
        return promotion;
    }

    async delete(id: number): Promise<Promotion> {
        const promotion = await prisma.promotion.delete({ where: { id } });
        return promotion;
    }

    async findAll(): Promise<Promotion[]> {
        const promotions = await prisma.promotion.findMany();
        return promotions;
    }

    async findByCategory(category: string): Promise<Promotion | null> {
        const promotion = await prisma.promotion.findFirst({ where: { category } });
        return promotion;
    }
}

export default new PromotionRepository();
