import { Request, Response, NextFunction } from 'express';
import { CategoriesRepository } from '../repositories';
import { Prisma, Categorie } from '@prisma/client';

class CategoriesController{
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const categorieData = req.body as Categorie;
            const checkCategorie =await CategoriesRepository.findByName(categorieData.name);

            if (checkCategorie) {
              return next({
                  status: 400,
                  message: 'Categorie already exists',
              });
            }

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
            const { id } = req.params;
            const categorie = await CategoriesRepository.findById(Number(id));

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

    async readAll(req: Request, res: Response, next: NextFunction){
      try{
          const categorie = await CategoriesRepository.findAll();

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
            const { id } = req.params;
            const categorieData = req.body as Prisma.CategorieUpdateInput;

            const categorie = await CategoriesRepository.update(Number(id), categorieData);

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
            const { id } = req.params;
            const categorie = await CategoriesRepository.delete(Number(id));

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
