import BaseEntity from './base.entity';

export default class RoomEntity extends BaseEntity {
  pj_id: string;
  description: string;
  type: string;
  price: number;
  capacity: number;
  caracteristics_ids: string[];
  local: string;
  stars: number;
  ar_condicionado: boolean;
  tv: boolean;
  wifi: boolean;  
  petFriendly: boolean;
  cafeDaManha: boolean; 
  estacionamento: boolean;
  avaliacao: number;

  constructor(data: RoomEntity) {
    super(data.id || '');
    this.pj_id = data.pj_id;
    this.description = data.description;
    this.price = data.price;
    this.type = data.type;
    this.capacity = data.capacity;
    this.caracteristics_ids = data.caracteristics_ids;
    this.local = data.local;
    this.stars = data.stars;
    this.ar_condicionado = data.ar_condicionado;  
    this.tv = data.tv;
    this.wifi = data.wifi;
    this.petFriendly = data.petFriendly;
    this.cafeDaManha = data.cafeDaManha;
    this.estacionamento = data.estacionamento
    this.avaliacao = data.avaliacao;
  }
}
