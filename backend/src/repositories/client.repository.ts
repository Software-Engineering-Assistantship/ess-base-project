import prisma from '../database';

export default class ClientRepository {
    async createClient(data: any) {
        return await prisma.client.create({
            data: data,
        });
    }

    async findClientByUsername(username: string) {
        return await prisma.client.findFirst({
            where: { username: username },
        });
    }

    async findClientByEmail(email: string) {
        return await prisma.client.findFirst({
            where: { email: email },
        });
    }

    async findClientByEmailOrUsername(email: string, username: string) {
        return await prisma.client.findFirst({
            where: {
                OR: [{ email: email }, { username: username }],
            },
        });
    }

    async findClientById(id: number) {
        return await prisma.client.findUnique({
            where: { id: id },
        });
    }

    async ListAll() {
        return await prisma.client.findMany();
    }

    async updateClient(id: number, data: any) {
        return await prisma.client.update({
            where: { id: id },
            data,
        });
    }

    async deleteClient(id: number) {
        return await prisma.client.delete({
            where: { id: id },
        });
    }

    async updateClientPassword(id: number, hashedPassword: string) {
        return await prisma.client.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }
}
