import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import PromotionService from '../services/promotion.service';
import { PromotionType } from '../enums/promotion-type.enum';

export interface Promotion {
  id: number;
  discount: number;
  type: PromotionType;
  num_rooms?: number | null; 
}

const promotionCreateDto = z.object({
  discount: z.number().min(5).max(60),
  type: z.nativeEnum(PromotionType),
  num_rooms: z.number().min(1).optional(),
});

export default class PromotionController {

  private prefix = '/reservation/:reservation_id/promotions';
  private prefixAll = '/hotelier/:hotelier_id/reservation/promotions';


  private promotionService: PromotionService;

  constructor(){
     this.promotionService = new PromotionService();
  }
  
  public setupRoutes(router: Router) {
    router.post(this.prefix, validateData(promotionCreateDto), (req, res) => this.insertPromotion(req, res));
    router.post(this.prefixAll, validateData(promotionCreateDto), (req, res) => this.insertPromotionAll(req, res));
    router.get(this.prefixAll, (req, res) => this.getAllPromotions(req, res));
    router.get(this.prefix, (req, res) => this.getPromotionById(req, res));
    router.delete(this.prefixAll, (req, res) => this.deleteAllPromotions(req, res));
    router.delete(this.prefix, (req, res) => this.deletePromotion(req, res));
    router.put(this.prefix, validateData(promotionCreateDto), (req, res) => this.updatePromotion(req, res));
  }

  private async getAllPromotions(req: Request, res: Response) {
    const promotions = await this.promotionService.getAllPromotions();
    res.status(200).json(promotions);
  }

  private async getPromotionById(req: Request, res: Response) {
    const {reservation_id} = req.params
    const promotion = await this.promotionService.getPromotionById(+reservation_id)
    res.status(200).json(promotion)
  }

  private async insertPromotion(req: Request, res: Response) {
    const { reservation_id } = req.params;
    const { discount, type, num_rooms } = req.body;
    const id = await this.promotionService.insertPromotion(+reservation_id, discount, type, num_rooms);
    res.status(201).json({ status: 201, message:`A promoção foi cadastrada com sucesso!`});
  }

  private async insertPromotionAll(req: Request, res: Response) {
    const { hotelier_id } = req.params;
    const { discount, type, num_rooms } = req.body;
    const id = await this.promotionService.insertPromotionAll(+hotelier_id, discount, type, num_rooms);
    res.status(201).json({ status: 201, message:`A promoção foi cadastrada em todas as reservas com sucesso!`});
  }

  private async deleteAllPromotions(req: Request, res: Response) {
    const { hotelier_id } = req.params;
    await this.promotionService.deleteAllPromotions(+hotelier_id);
    res.status(200).json({ status: 200, message:'Todas as promoções foram deletadas com sucesso!'});
  }

  private async deletePromotion(req: Request, res: Response) {
    const { reservation_id } = req.params
    await this.promotionService.deletePromotionById(+reservation_id);
    res.status(200).json({ status: 200, message:`A promoção foi deletada com sucesso!`});
  }

  private async updatePromotion(req: Request, res: Response) {
    const { reservation_id } = req.params;
    const { discount, type, num_rooms } = req.body;
    await this.promotionService.updatePromotionById(+reservation_id, discount, type, num_rooms);
    res.status(200).json({ status: 200, message:`A promoção foi atualizada com sucesso!`});
  } 
}



