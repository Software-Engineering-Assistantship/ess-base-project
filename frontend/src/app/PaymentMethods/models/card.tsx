export enum CardType{
    CREDITO = 'CREDITO',
    DEBITO = 'DEBITO'
}

export interface CardModel {
    id: number;
    name: string;
    numCard: string; // 
    cvv: number;
    expiryDate: string;
    type: string;
    clientId: number; //
    cpf: string;
}
    