import ReservationEntity from '../entities/reservation.entity';
import BaseRepository from './base.repository';

class ReservationRepository extends BaseRepository<ReservationEntity> {
  constructor() {
    super('Reservation');
  }

  public async getReservations(): Promise<ReservationEntity[]> {
    return await this.findAll();
  }

  public async getReservation(id: string): Promise<ReservationEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createReservation(data: ReservationEntity): Promise<ReservationEntity> {
    return await this.add(data);
  }

  public async updateReservation(
    id: string,
    data: ReservationEntity
  ): Promise<ReservationEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteReservation(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default ReservationRepository;
