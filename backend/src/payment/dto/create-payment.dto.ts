export class CreatePaymentDto {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: number;
  type: string;
}
