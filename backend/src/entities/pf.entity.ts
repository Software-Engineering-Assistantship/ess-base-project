import BaseEntity from './base.entity';

export default class PFEntity extends BaseEntity {
  user_id: string;
  name: string;
  birth_date: Date;
  cpf: string;
  phone: string;

  constructor(data: PFEntity) {
    super(data.id || '');
    this.user_id = data.user_id;
    this.name = data.name;
    this.birth_date = data.birth_date;
    this.cpf = data.cpf;
    this.phone = data.phone;
  }
}
