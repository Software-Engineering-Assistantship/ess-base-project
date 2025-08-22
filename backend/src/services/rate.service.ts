import{PrismaClient, Client, Reserve, RateReservation, PublishedReservation} from "@prisma/client";
import RateRepository from "../repositories/rate.repository";

export default class RateService{
    private rateRepository: RateRepository;

    constructor() {
        this.rateRepository = new RateRepository();
    }
    private prepareRateParams(rating: number, comments?: string): Partial<RateReservation> {
        if (rating === undefined) {
            throw new Error('Preencha todos os campos');
        }
        let params: Partial<RateReservation> = { rating };
        if (comments) {
            params.comments = comments;
        }
        return params;
    }
    async rateReservation(reservation_id: number, client_id: number, rating: number, comments?: string): Promise<void> {
        let params = this.prepareRateParams(rating, comments);
        return await this.rateRepository.rateReservation(reservation_id, client_id, params);
    }

    async getAllRatesbyPublishedReservation(reservation_id : number): Promise<RateReservation[]>{
        return await this.rateRepository.getAllRatesbyPublishedReservation(reservation_id);
    }

    async getAllRatesbyClient(client_id : number): Promise<RateReservation[]>{
        return await this.rateRepository.getAllRatesbyClient(client_id);
    }

    async deleteRateReservation(client_id: number, reservation_id: number): Promise<void>{
        await this.rateRepository.deleteRateReservation(client_id, reservation_id);
    }

    async editRateReservation(client_id: number, reservation_id: number, rating:number,comments?: string): Promise<void>{
        let params = this.prepareRateParams(rating, comments);
        return await this.rateRepository.editRateReservation(client_id, reservation_id, params);
    }
}

