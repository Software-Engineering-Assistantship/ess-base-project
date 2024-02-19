import prisma from '@database';
import { Prisma, Receipt } from '@prisma/client';

class ReceiptRepository {
    async create(data: Prisma.ReceiptCreateInput): Promise<Receipt> {
        const receipt = await prisma.receipt.create({ data });
        return receipt;
    }

    async findById(id: number): Promise<Receipt | null> {
        const receipt = await prisma.receipt.findUnique({ where: { id } });
        return receipt;
    }

    async delete(id: number): Promise<Receipt | null>{
        const receipt = await prisma.receipt.delete({ where: { id } });
        return receipt;
    }

    async findAll(): Promise<Receipt[]> {
        const receipts = await prisma.receipt.findMany();
        return receipts;
    }
}

export default new ReceiptRepository();
