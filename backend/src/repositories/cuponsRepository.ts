import prisma from '@database';
import { Prisma, Cupom } from '@prisma/client';

class CuponsRepository {
    async create(data: Prisma.CupomCreateInput): Promise<Cupom> {
        const cupom = await prisma.cupom.create({ data });
        return cupom;
    }

    async findById(id: number): Promise<Cupom | null> {
        const cupom = await prisma.cupom.findUnique({ where: { id } });
        return cupom;
    }

    async delete(id: number): Promise<Cupom> {
        const cupom = await prisma.cupom.delete({ where: { id } });
        return cupom;
    }

    async findByName(name: string): Promise<Cupom | null> {
        const cupom = await prisma.cupom.findFirst({ where: { name } });
        return cupom;
    }

    async findAll(): Promise<Cupom[]> {
        const cupons = await prisma.cupom.findMany();
        return cupons;
      }
}

export default new CuponsRepository();
