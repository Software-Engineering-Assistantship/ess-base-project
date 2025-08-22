import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import SaveService from '../services/save.service';

export interface Save {
    id: number;
}

const saveReservationDto = z.object({
    client_id: z.number(),
    reservation_id: z.number(),
});

export default class SaveController {
    private prefix = '/saved-reservations';
    private saveService: SaveService;

    constructor() {
        this.saveService = new SaveService();
    }

    public setupRoutes(router: Router) {
        router.post(this.prefix, validateData(saveReservationDto), (req, res) => this.saveReservation(req, res));
        router.get(this.prefix + '/publishedReservation/:id', (req, res) => this.getSavedReservationByClientId(req, res));
        router.delete(this.prefix + '/:client_id/:reservation_id', (req, res) => this.deleteSavedReservationById(req, res));
    }

    private async saveReservation(req: Request, res: Response) {
        const { client_id, reservation_id } = req.body;
        const result = await this.saveService.saveReservation(Number(client_id), Number(reservation_id));
        res.status(201).json(result);
    }


    private async getSavedReservationByClientId(req: Request, res: Response) {
        const { id } = req.params;
        const savedList = await this.saveService.getSavedReservationByClientId(Number(id));
        res.status(200).json(savedList);
    }

    private async deleteSavedReservationById(req: Request, res: Response) {
        const { client_id, reservation_id} = req.params;
        await this.saveService.deleteSavedReservationById(Number(client_id), Number(reservation_id));
        res.status(204).send();
    }
  }


