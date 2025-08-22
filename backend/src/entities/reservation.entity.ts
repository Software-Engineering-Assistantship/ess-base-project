import BaseEntity from './base.entity';

export default class ReservationEntity extends BaseEntity {
  pf_id: string;
  room_id: string;
  check_in: Date;
  check_out: Date;
  guests: number;
  total: number;
  status: string;
  rating: number;

  constructor(data: ReservationEntity) {
    super(data.id || '');
    this.pf_id = data.pf_id;
    this.room_id = data.room_id;
    this.check_in = data.check_in;
    this.check_out = data.check_out;
    this.guests = data.guests;
    this.total = data.total;
    this.status = data.status;
    this.rating = data.rating;
  }
}
