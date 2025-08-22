import prisma from '../database';

export default class HotelierRepository {
    async createHotelier(data: any) {
        return await prisma.hotelier.create({
            data: data,
        });
    }

    async findHotelierByUsername(username: string) {
        return await prisma.hotelier.findFirst({
            where: { username: username },
        });
    }

    async findHotelierByEmail(email: string) {
        return await prisma.hotelier.findFirst({
            where: { email: email },
        });
    }

    async findHotelierByEmailOrUsername(email: string, username: string) {
        return await prisma.hotelier.findFirst({
            where: {
                OR: [{ email: email }, { username: username }],
            },
        });
    }

    async findHotelierById(id: number) {
        return await prisma.hotelier.findUnique({
            where: { id: id },
        });
    }

    async ListAll() {
        return await prisma.hotelier.findMany();
    }

    async updateHotelier(id: number, data: any) {
        return await prisma.hotelier.update({
            where: { id: id },
            data,
        });
    }

    async deleteHotelier(id: number) {
        return await prisma.hotelier.delete({
            where: { id: id },
        });
    }

    async updateHotelierPassword(id: number, hashedPassword: string) {
        return await prisma.hotelier.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }
}
