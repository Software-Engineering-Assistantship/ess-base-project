import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { OrderService } from 'src/interfaces/order-service';

@Controller('/order/:id')
export class GetOrderDetailsController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    const order = await this.orderService.findOne(id);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }
}
