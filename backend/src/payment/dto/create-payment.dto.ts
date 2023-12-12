export class CreatePaymentDto {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  type: string;
}
