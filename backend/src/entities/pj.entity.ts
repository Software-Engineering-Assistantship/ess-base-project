import BaseEntity from './base.entity';

export default class PJEntity extends BaseEntity {
  name: string;
  stars: number;
  cnpj: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  state: string;
  city: string;
  neighborhood: string;
  complement: string;
  profile_picture: string;
  user_id: string;

  constructor(data: PJEntity) {
    super(data.id || '');
    this.user_id = data.user_id;
    this.name = data.name;
    this.stars = data.stars;
    this.cnpj = data.cnpj;
    this.phone = data.phone;
    this.cep = data.cep;
    this.street = data.street;
    this.number = data.number;
    this.state = data.state;
    this.city = data.city;
    this.neighborhood = data.neighborhood;
    this.complement = data.complement;
    this.profile_picture = data.profile_picture;
  }
}
