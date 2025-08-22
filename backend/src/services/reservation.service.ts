import {Reserve} from "../controllers/reservation.controller";
import { createDeleteContent, createHtmlContent, createUpdateContent } from "../email/format";
import ReservationRepository from "../repositories/reservation.repository";
import {HttpBadRequestError, HttpError, HttpInternalServerError, HttpNotFoundError} from '../utils/errors/http.error';
import EmailService from "./email.service";


export default class ReservationService {


    private reservationRepository: ReservationRepository;


    constructor() {
        this.reservationRepository = new ReservationRepository();
    }


    private async prepareReservationParams(num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName: string, publishedReservationId: number, clientId: number): Promise<Reserve> {
        // console.log(`Received parameters2:`, {
        //     num_rooms,
        //     checkin,
        //     checkout,
        //     num_adults,
        //     num_children,
        //     paymentMethodName,
        //     publishedReservationId,
        //     clientId
        // });
        if (!num_rooms || !checkin || !checkout || !num_adults || !paymentMethodName) {
            throw new HttpBadRequestError({msg: 'Preencha todos os campos'});
        }
        // Buscar a reserva publicada
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(publishedReservationId);
        if (!publishedReservation) {
            throw new HttpNotFoundError({msg: 'Oferta de reserva não encontrada'});
        }
        // Buscar o cliente
        const client = await this.reservationRepository.getClientById(clientId);
        if (!client) {
            throw new HttpNotFoundError({msg: 'Faça login ou cadastre-se!'});
        }
        // Buscar os métodos de pagamento
        const paymentMethods = await this.reservationRepository.getPaymentMethod(clientId);
        if (!paymentMethods) {
            throw new HttpNotFoundError({msg: 'Cadastre um método de pagamento.'});
        }
       
        // Encontrar o método de pagamento pelo numero
        let paymentMethodId = 0;
        for (const payMethod of paymentMethods) {
            if (payMethod.numCard.toLowerCase() === paymentMethodName.toLowerCase()) {
                paymentMethodId = payMethod.id;
                break;
            }
        }
        if (paymentMethodId === 0) {
            throw new HttpNotFoundError({msg: 'Cadastre um método de pagamento.'});
        }


        // Calculando o preço da reserva
        const numDays = this.calculateNumDays(checkin, checkout);
        const price = numDays * num_rooms * publishedReservation.new_price;


        let params = { num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName, price, publishedReservationId, clientId, paymentMethodId } as Reserve;
        return params;
    }


    private calculateNumDays(checkin: string, checkout: string): number {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
        return Math.ceil(timeDifference / (1000 * 3600 * 24));
    }


    async sendEmailtoClientCreate(title: string, num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, publishedReservationId: number, clientId: number, ): Promise<void>{
        const client = await this.reservationRepository.getClientById(clientId);
        const reservation = await this.reservationRepository.getPublishedReservationById(publishedReservationId);
        const htmlContent = await createHtmlContent(client.name, reservation.name, checkin, checkout, num_rooms, num_adults, num_children)
        EmailService.sendEmail(`${client.email}`, title, htmlContent);
    }


    async sendEmailtoClientUpdate(title: string, num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, reservationId: number): Promise<void>{
        const reservation = await this.reservationRepository.getReservationById(reservationId);
        const client = await this.reservationRepository.getClientById(reservation.clientId);
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(reservation.publishedReservationId);
        const htmlContent = await createUpdateContent(client.name, publishedReservation.name, checkin, checkout, num_rooms, num_adults, num_children)
        EmailService.sendEmail(`${client.email}`, title, htmlContent);
    }


    async sendEmailtoClientDelete(title: string, reservationId: number) : Promise<void>{
        const reservation = await this.reservationRepository.getReservationById(reservationId);
        const client = await this.reservationRepository.getClientById(reservation.clientId);
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(reservation.publishedReservationId);
        const htmlContent = await createDeleteContent(client.name, publishedReservation.name, reservation.checkin, reservation.checkout, reservation.price);
        EmailService.sendEmail(`${client.email}`, title, htmlContent);
    }


    async createReservation(num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName: string, publishedReservationId: number, clientId: number): Promise<{id: number}> {
        try{
            const availableRooms = await this.checkRoomAvailability(num_rooms, checkin, checkout, num_adults, num_children, publishedReservationId);
            if (!availableRooms) {
                throw new HttpNotFoundError({msg: 'Não há quartos disponíveis para o período selecionado.'});
            }
            const reservationParams = await this.prepareReservationParams(num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName, publishedReservationId, clientId);
            const id = await this.reservationRepository.createReservation(reservationParams);
            this.sendEmailtoClientCreate("Confirmação da reserva", num_rooms, checkin, checkout, num_adults, num_children, publishedReservationId, clientId);
            return id;
        }
        catch (error:any){
            if(error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error creating reservation: ${error.message}`});
            }
        }
    }
   
    async cancelReservation(id: number): Promise<void> {
        try{
            await this.sendEmailtoClientDelete("Cancelamento da reserva", id);
            await this.reservationRepository.cancelReservation(id);
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error canceling reservation: ${error.message}`});
            }
        }
    }


    async cancelReservationByClient(clientId: number): Promise<void> {
        try {
            await this.reservationRepository.cancelReservationByClient(clientId);
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error canceling reservations: ${error.message}`});
            }
        }
    }


    async calculatePrice(num_rooms: number, checkin: string, checkout: string, publishedReservationId: number): Promise<number> {
        const numDays = this.calculateNumDays(checkin, checkout);
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(publishedReservationId);


        if (!publishedReservation) {
            throw new HttpNotFoundError({msg: 'Oferta de reserva não encontrada'});
        }
        const price = numDays * num_rooms * publishedReservation.new_price;
        return price;
    }


    async updateReservation(id: number, num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName?: string): Promise<void> {
        if (!num_rooms || !checkin || !checkout || !num_adults || !paymentMethodName) {
            throw new HttpBadRequestError({msg: 'Preencha todos os campos'});
        }
        try{
            const reservation = await this.reservationRepository.getReservationById(id);
            if (!reservation) {
                throw new HttpNotFoundError({msg: 'Reserva não encontrada'});
            }
            reservation.num_rooms = num_rooms;
            reservation.checkin = checkin;
            reservation.checkout = checkout;
            reservation.num_adults = num_adults;
            reservation.num_children = num_children;
       
            if (paymentMethodName) {
                // Buscar os métodos de pagamento do cliente
                const paymentMethods = await this.reservationRepository.getPaymentMethod(reservation.clientId);
                if (!paymentMethods) {
                    throw new HttpNotFoundError({msg: 'Cadastre o método de pagamento'});
                }
       
                // Encontrar o método de pagamento pelo numero
                let paymentMethodId = 0;
                for (const payMethod of paymentMethods) {
                    if (payMethod.numCard.toLowerCase() === paymentMethodName.toLowerCase()) {
                        paymentMethodId = payMethod.id;
                        break;
                    }
                }
                if (paymentMethodId === 0) {
                    throw new HttpNotFoundError({msg: 'Cadastre o método de pagamento'});
                }
       
                reservation.paymentMethodName = paymentMethodName;
                reservation.paymentMethodId = paymentMethodId;
            }
       
            const availableRooms = await this.doublecheckRoomAvailability(reservation.id, reservation.num_rooms, reservation.checkin, reservation.checkout, reservation.num_adults, reservation.num_children, reservation.publishedReservationId);
            if (!availableRooms) {
                throw new HttpNotFoundError({msg: 'Não há quartos disponíveis para o período selecionado'});
            }
            const newPrice = await this.calculatePrice(reservation.num_rooms, reservation.checkin, reservation.checkout, reservation.publishedReservationId);
            reservation.price = newPrice;
       
            await this.reservationRepository.updateReservation(id, reservation);
            this.sendEmailtoClientUpdate("Atualização na reserva", num_rooms, checkin, checkout, num_adults, num_children, id);
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error updating reservation: ${error.message}`});
            }
        }
    }
   
    async getReservationById(id: number): Promise<Reserve> {
        try{
            return await this.reservationRepository.getReservationById(id);    
        }catch(error: any){
            throw new HttpInternalServerError({msg: `Error fetching reservation: ${error.message}`});
        }  
    }


    public async getReservationsByClient(clientId: number): Promise<Reserve[]> {
        try{
            return await this.reservationRepository.getReservationsByClient(clientId);
        }catch(error: any){
            throw new HttpInternalServerError({msg: `Error fetching all reservation: ${error.message}`});
        }
    }
    public async checkRoomAvailability(num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, publishedReservationId: number): Promise<boolean> {
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(publishedReservationId);
        if (!publishedReservation) {
            throw new HttpNotFoundError({msg: 'Oferta de reserva não encontrada'});
        }
        const totalPeople = (num_adults + (num_children*0.5));
        if (totalPeople > publishedReservation.people) {
            throw new HttpBadRequestError({msg: 'Capacidade de hóspedes no quarto excedida.'});
        }
        const existingReservations = await this.reservationRepository.getReservationsByPeriod(checkin, checkout, publishedReservationId);
        let reservedRooms = 0;
        for (const reservation of existingReservations) {
            reservedRooms += reservation.num_rooms;
        }
        const availableRooms = publishedReservation.rooms - reservedRooms;
        return availableRooms >= num_rooms;        
    }




    public async doublecheckRoomAvailability(id: number, num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, publishedReservationId: number): Promise<boolean> {
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(publishedReservationId);
        if (!publishedReservation) {
            throw new HttpNotFoundError({msg: 'Oferta de reserva não encontrada'});
        }
        const totalPeople = (num_adults + (num_children*0.5));
        if (totalPeople > publishedReservation.people) {
            return false;
        }
        const existingReservations = await this.reservationRepository.getReservationsByPeriodAndId(id, checkin, checkout, publishedReservationId);
        let reservedRooms = 0;
        for (const reservation of existingReservations) {
            reservedRooms += reservation.num_rooms;
        }
        const availableRooms = publishedReservation.rooms - reservedRooms;
        return availableRooms >= num_rooms;        
    }
}
