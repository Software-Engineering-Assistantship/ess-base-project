import { Request, Response, Router } from "express";
import PublishedReservationService from "../services/publishedReservation.service";
import ReservationService from "../services/reservation.service";
import { z } from "zod";
import { validateData } from "../middleware/validation-middleware";
import prisma from "../database";
import multer, {Multer} from "multer";
import path from "path";
import PromotionService from "../services/promotion.service";


declare global {
    namespace Express {
      interface Request {
        file?: Multer.File;
      }
    }
  }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
  
  
const upload = multer({ storage: storage });

export interface PublishedReservation{
    id: number;
    name: string;
    rooms: number; 
    people: number; 
    wifi: boolean;
    breakfast: boolean;  
    airConditioner: boolean; 
    parking: boolean;
    room_service: boolean;
    price: number;
    new_price: number;
    promotion_id?: number | null;
    hotelier_id: number;
    imageUrl?: string | null;
}

// export interface Hotelier{
//     id: number;
//     name: string;
//     email: string; 
//     username: string; 
//     password: string; 
//     hotel: string;
//     city: string; 
//     cep: string; 
//     adress: string; 
//     n_adress: string; 
//     UF: string; 
//     cnpj: string; 
// }

// export interface PublishedReservationWHotelier{
//     id: number;
//     name: string;
//     rooms: number; 
//     people: number; 
//     wifi: boolean;
//     breakfast: boolean;  
//     airConditioner: boolean; 
//     parking: boolean;
//     room_service: boolean;
//     price: number;
//     new_price: number;
//     promotion_id?: number | null;
//     hotelier_id: number;
//     hotelier: Hotelier;
//     imageUrl?: string | null;
// }
export interface IGetReservationsByFilters{
    num_rooms: number;
    num_adults: number;
    num_children: number;
    city: string;
}

const publishedReservationGetDto = z.object({
    num_rooms: z.number().min(1),
    checkin: z.string(),
    checkout: z.string(),
    num_adults: z.number().min(1),
    num_children: z.number(),
})

const publishedReservationDto = z.object({
    name: z.string(),
    rooms: z.number().min(1),
    people: z.number().min(1),
    wifi: z.boolean(),
    breakfast: z.boolean(),
    airConditioner: z.boolean(),
    parking: z.boolean(),
    room_service: z.boolean(),
    price: z.number(),
})

const publishedReservationUpdateDto = z.object({
    name: z.string().optional(),
    rooms: z.number().min(1).optional(),
    people: z.number().min(1).optional(),
    wifi: z.boolean().optional(),
    breakfast: z.boolean().optional(),
    airConditioner: z.boolean().optional(),
    parking: z.boolean().optional(),
    room_service: z.boolean().optional(),
    price: z.number().optional(),
})

export default class PublishedReservationController{
    private prefix = '/reservations';
    private prefixReservation = '/hotelier/:hotelier_id/reservations';

    private publishedReservationService: PublishedReservationService;
    private reservationService: ReservationService;
    private promotionService: PromotionService;
    // private hotelierService: Hotelier

    constructor(){
        this.publishedReservationService = new PublishedReservationService();
        this.reservationService = new ReservationService();
        this.promotionService = new PromotionService();
    }

    public setupRoutes(router: Router){
        // pega todas as reservas
        router.post('/reservation/:reservation_id/upload', upload.single('image'), (req, res) => this.uploadImage(req, res));
        router.get(this.prefix, (req, res) => this.getAllPublishedReservations(req, res));

        router.get(this.prefix + '/:id',  (req, res) => this.getPublishedReservationById(req, res));
        router.post(this.prefixReservation, validateData(publishedReservationDto), (req, res) => this.insertPublishedReservation(req, res));
        router.patch(this.prefix + '/:id', (req, res) => this.updatePublishedReservation(req, res));
        router.delete(this.prefix + '/:id', (req, res) => this.deletePublishedReservation(req, res));
        //router.get(this.prefix + '/hotelier/:id', (req, res) => this.getPublishedReservationWithHotelierById(req, res));
        // pega todas as reservas com filtros especificos (busca de reservas)
        router.post(this.prefix, validateData(publishedReservationGetDto), (req, res) => this.getPublishedReservationsByFilters(req, res)); 
    }

    
    // private getPublishedReservationWithHotelierById(req: Request, res: Response) {
    //     const { id } = req.params;
    //     console.log(`Request received with id: ${id}`);
    //     const reservation =
    //         this.publishedReservationService.getPublishedReservationWithHotelierById(+id);
    //     res.status(200).json(reservation);
    // }

    private async uploadImage(req: Request, res: Response){
        const { reservation_id } = req.params;
        const file = req.file;
        if (!file) {
            throw new Error('Arquivo n�o encontrado');
        }
        const imageUrl = `/images/${file.filename}`;
        await this.publishedReservationService.insertImageUrl(+reservation_id, imageUrl);
        res.status(200).json(file);
    }

    private async getAllPublishedReservations(req: Request, res: Response){
        const reservations = await this.publishedReservationService.getAllPublishedReservations();
        res.status(200).json(reservations);
    }

    private async getPublishedReservationById(req: Request, res: Response){
        const { id } = req.params;
        const reservation = await this.publishedReservationService.getPublishedReservationById(+id);
        res.status(200).json(reservation);
    }

    private async insertPublishedReservation(req: Request, res: Response){
        const { hotelier_id } = req.params;
        const { name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price } = req.body;
        const id = await this.publishedReservationService.insertPublishedReservation(+hotelier_id, name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price);
        res.status(200).json({id});
    }

    private async updatePublishedReservation(req: Request, res: Response){
        const { id } = req.params;
        const { name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price } = req.body; 
        await this.publishedReservationService.updatePublishedReservation(+id, name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price);
        res.status(200).json({status: 200, message: 'Reserva atualizada com sucesso'});
    }

    private async deletePublishedReservation(req: Request, res: Response){
        const { id } = req.params;

        const reservation = await this.publishedReservationService.getPublishedReservationById(+id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reserva n�o encontrada' });
        }

        if (reservation.imageUrl) {
            const imagePath = path.join(__dirname, '..', reservation.imageUrl);
            await this.publishedReservationService.deletePublishedReservation(+id, imagePath); 
        }
        res.status(200).json({status: 200, message: 'Reserva deletada com sucesso'});
    }

    private async filterReservationsByCity(reservations: PublishedReservation[], city: string){
        let reservationsInCity = [] as any[];

        for(let i = 0; i < reservations.length; i++){
            let hotelier = await prisma.hotelier.findUnique({
                where: {
                    id: reservations[i].hotelier_id
                }
            });

            if(!hotelier){
                throw new Error("Hoteleiro n�o encontrado");
            }

            if(hotelier.city == city){
                reservationsInCity.push({...reservations[i], city: hotelier.city});
            }
        }

        return reservationsInCity;
    }

    private async getPublishedReservationsByFilters(req: Request, res: Response) {
        const {num_rooms, city, num_adults, num_children, checkin, checkout} = req.body;
        const reservations = await this.publishedReservationService.getReservationsByFilters({num_rooms, city, num_adults, num_children,});

        let reservationsInCity = await this.filterReservationsByCity(reservations, city);

        let availableReservations = [] as any[];

        for(let i = 0; i < reservationsInCity.length; i++){
            let available = await this.reservationService.checkRoomAvailability(reservations[i].rooms, checkin, checkout, num_adults, num_children, reservationsInCity[i].id);
            if(available){
                availableReservations.push(reservationsInCity[i]);
            }
        }

        res.status(200).json(availableReservations);
    }
}