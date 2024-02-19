import prisma from "@database";
import {Prisma, Categorie} from '@prisma/client';

class CategoriesRepository {
    async create(data: Prisma.CategorieCreateInput) :Promise<Categorie> {
        const categorie = await prisma.categorie.create({data});
        return categorie;
    }

    async findById(id: number): Promise<Categorie | null> {
        const categorie = await prisma.categorie.findUnique({ where: { id } });
        return categorie;
    }
    
    async findByName(name: string): Promise<Categorie | null> {
        const categorie = await prisma.categorie.findFirst({ where: { name } });
        return categorie;
      }

    async update(id: number, data: Prisma.CategorieUpdateInput): Promise<Categorie> {
        const categorie = await prisma.categorie.update({ where: { id }, data });
        return categorie;
    }

    async delete(id: number): Promise<Categorie> {
        const categorie = await prisma.categorie.delete({ where: { id } });
        return categorie;
    }

    async findAll(): Promise<Categorie[]> {
        const categories = await prisma.categorie.findMany();
        return categories;
    }
}

export default new CategoriesRepository();