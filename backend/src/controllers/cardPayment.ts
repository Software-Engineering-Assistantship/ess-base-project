import { CardPaymentRepository } from '../repositories';
import { Request, Response, NextFunction } from 'express';
import { CardPayment, Prisma } from '@prisma/client';
import { read } from 'fs';

class CardPaymentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {cardCreatedData, User_id} = req.body as {cardCreatedData: CardPayment, User_id: number};

      const existsCardWithNumber = await CardPaymentRepository.findUnique(
        cardCreatedData.card_number, cardCreatedData.type
      );

      if (existsCardWithNumber) {
        return next({
          status: 400,
          message: 'This card is already registered',
        });
      }

      if (cardCreatedData.card_number.length != 19 || cardCreatedData.cvv.toString().length != 3 
        || cardCreatedData.password.length != 6 || (cardCreatedData.type != "debit" 
        && cardCreatedData.type != "credit")){
          return next({
            status: 400,
            message: 'Fields invalid'
          })
      }

      const card = await CardPaymentRepository.create(cardCreatedData, User_id);

      res.locals = {
        status: 201,
        message: 'Card registered with success',
        data: card,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readByNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const { number } = req.params;

      const card = await CardPaymentRepository.findByNumber(Number(number));

      if (card?.length == 0) {
        return next({
          status: 404,
          message: 'Card not found',
        });
      }

      res.locals = {
        status: 200,
        data: card,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction){
    try{
        const { card_id } = req.params;

        const card = await CardPaymentRepository.findByCardId(card_id);

        if(card) {
          const deleted_card = await CardPaymentRepository.delete(card_id);

          return next({
            status: 200,
            message: 'Card removed with success',
            data: deleted_card,
          });
        }

        res.locals = {
          status: 404,
          message: 'Card not found',
        };

    return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new CardPaymentController();