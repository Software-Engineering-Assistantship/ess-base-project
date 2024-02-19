import { Controller, Get, HttpCode } from '@nestjs/common';
import { OrderService } from 'src/interfaces/order-service';

@Controller('/order')
export class GetAllOrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    return await this.orderService.findAll();
  }
}
