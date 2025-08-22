import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import ReservationService from '../services/reservation.service';
import { CardType } from '../enums/paymentMethod-type.enum';
import {Promotion} from '../controllers/promotion.controller';


export interface Hotelier{
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    hotel: string;
    city: string;
    cep: string;
    address: string;
    n_address: string;
    UF: string;
    adress: string;
    cnpj: string;
}


export interface Reserve {
    id: number;
    num_rooms: number;
    checkin: string; // "YYYY-MM-DD"
    checkout: string;
    num_adults: number;
    num_children: number;
    paymentMethodName: string; //numero do cartao
    price: number;
    publishedReservationId: number;
    clientId: number;
    paymentMethodId: number;
}


export interface PublishedReservation{
    id: number;
    name: string;
    rooms: number;
    people: number;
    wifi: Boolean;
    breakfast: Boolean;  
    airConditioner: Boolean;
    parking: Boolean;
    room_service: Boolean;
    price: number;
    new_price: number;
    promotion?: Promotion;
    promotion_id?: number;
    hotelier?: Hotelier;
    hotelier_id: number;
}


export interface Client{
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    cpf: string;
    birthDate: string;
}


export interface PaymentMethod{
    id: number;
    name: string;
    numCard: string;
    cvv: number;
    expiryDate: string;
    type: CardType;
    clientId: number;
    cpf: string;
}




const reservationCreateDto = z.object({
    num_rooms: z.number().min(1),
    checkin: z.string(),
    checkout: z.string(),
    num_adults: z.number().min(1),
    num_children: z.number(),
    paymentMethodName: z.string(),
});


const reservationUpdateDto = z.object({
    num_rooms: z.number().min(1),
    checkin: z.string(),
    checkout: z.string(),
    num_adults: z.number().min(1),
    num_children: z.number(),
    paymentMethodName: z.string(),
});

export default class ReserveController {
    private prefix = '/client/:clientId/publishedReservation/:publishedReservationId/reserve';
    private prefix2 = '/client/:clientId/reserve';
    private prefix3 = '/reserve';
    private reservationService: ReservationService;
    constructor() {
        this.reservationService = new ReservationService();
    }

    public setupRoutes(router: Router) {
        // criar novas reservas
        router.post(this.prefix, validateData(reservationCreateDto), (req, res) => this.createReservation(req, res));
        // editar reserva
        router.put(this.prefix + '/:id', validateData(reservationUpdateDto), (req, res) => this.updateReservation(req, res));
        // cancelar reserva
        router.delete(this.prefix3 + '/:id', (req, res) => this.cancelReservation(req, res));
        //cancelar todas as reservas de um cliente
        router.delete(this.prefix2, (req, res) => this.cancelReservationByClient(req, res));
        // pegar os dados de uma reserva
        router.get(this.prefix3 + '/:id', (req, res) => this.getReservationById(req, res));
        // pegar todas as reservas de um cliente (minhas reservas)
        router.get(this.prefix2, (req, res) => this.getReservationsByClient(req, res));
    }

    private async createReservation(req: Request, res: Response) {        
        const {num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName} = req.body;
        const publishedReservationId = parseInt(req.params.publishedReservationId);
        const clientId = parseInt(req.params.clientId);
        // console.log(`Received parameters:`, {
        //     num_rooms,
        //     checkin,
        //     checkout,
        //     num_adults,
        //     num_children,
        //     paymentMethodName,
        //     publishedReservationId,
        //     clientId
        // });
        const {id} = await this.reservationService.createReservation(num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName, publishedReservationId, clientId)
        res.status(201).json({status: 201, message: 'Reserva realizada com sucesso!' });      
    }
   
    private async cancelReservation(req: Request, res: Response) {
        const {id} = req.params;
        await this.reservationService.cancelReservation(+id);
        res.status(200).json({status: 200, message: 'Reserva cancelada com sucesso.'});
    }

    private async cancelReservationByClient(req: Request, res: Response){
        const clientId  = parseInt(req.params.clientId);
        await this.reservationService.cancelReservationByClient(clientId);
        res.status(200).json({status: 200, message: 'Todas as reservas foram canceladas com sucesso.'});
    }

    private async updateReservation(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const publishedReservationId = parseInt(req.params.publishedReservationId);
        const { num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName } = req.body;
   
        // verificar se a reserva está disponível para as novas datas
        const availableRooms = await this.reservationService.doublecheckRoomAvailability(id, num_rooms, checkin, checkout, num_adults, num_children, publishedReservationId);
        if (!availableRooms) {
            res.status(404).json({status: 404, message: 'Não há quartos disponíveis para o período selecionado.'})
        }
        await this.reservationService.updateReservation(id, num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName);
        res.status(200).json({status: 200, message: 'Reserva atualizada com sucesso!'});
    }
   
    private async getReservationById(req: Request, res: Response) {
        const { id } = req.params;
        const reservation = await this.reservationService.getReservationById(+id);
        res.status(200).json(reservation);  
    }


    private async getReservationsByClient(req: Request, res: Response) {
        const { clientId } = req.params;
        const reservations = await this.reservationService.getReservationsByClient(+clientId);
        res.status(200).json(reservations);      
    }
}
