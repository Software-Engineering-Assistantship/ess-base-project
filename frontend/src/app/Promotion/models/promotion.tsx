export enum PromotionType{
    ILIMITADA = 'ILIMITADA',
    LIMITE_QUARTO = 'LIMITE_QUARTO'
}

export interface PromotionModel {
    id?: number;
    discount: number;
    type: PromotionType;
    num_rooms?: number | null; 
  }
  