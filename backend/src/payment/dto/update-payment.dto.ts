import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: number;
  type: string;
}
