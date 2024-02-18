import { Request, Response, NextFunction } from 'express';
import { CategoriesRepository } from '../repositories';
import { Prisma, Categorie } from '@prisma/client';

class CategoriesController{
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const categorieData = req.body as Categorie;
            const categorie = await CategoriesRepository.create(categorieData);

            res.locals = {
              status: 201,
              message: 'Categorie created',
              data: categorie,
            };

            return next();
        }catch (e) {return next(e);}
    }

    async read(req: Request, res: Response, next: NextFunction){
        try{
            const { categorieId } = req.params;
            const categorie = await CategoriesRepository.findByID(Number(categorieId));

            if (!categorie){
              return next({
                status: 404,
                message: 'Categorie not found',
              });
            }

            res.locals = {
              status: 200,
              data: categorie,
            }

            return next();
        }catch(e) {return next(e)}
    }

    async update(req: Request, res: Response, next: NextFunction){
        try{
            const { categorieID } = req.params;
            const categorieData = req.body as Prisma.CategorieUpdateInput;

            const categorie = await CategoriesRepository.update(Number(categorieID), categorieData);

            if(!categorie){
              return next({
                status: 404,
                message: 'Categorie not found',
              });
            }

            res.locals = {
              status: 200,
              data: categorie,
              message: 'Categorie updated',
            }

            return next();
        }catch(e) {return next(e)}
    }

    async delete(req: Request, res:Response, next: NextFunction) {
        try{
            const { categorieID } = req.params;
            const categorie = await CategoriesRepository.delete(Number(categorieID));

            if (!categorie){
              return next({
                status: 404,
                message: 'Categorie not found',
              });
            }

            res.locals = {
              status: 200,
              message: 'Categorie deleted'
            }

            return next();
        }catch(e) {return next(e)}
    }
}

export default new CategoriesController();
