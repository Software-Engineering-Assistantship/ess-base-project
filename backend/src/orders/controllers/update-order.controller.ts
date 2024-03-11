import { Controller, Patch, HttpCode, Param, Body } from '@nestjs/common';
import { OrderService } from 'src/interfaces/order-service';
import { UpdateOrderSchema } from '../dto/update-order';

@Controller('/order/:id')
export class UpdateOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Patch()
  @HttpCode(204)
  async handle(@Param('id') id: string, @Body() rate: UpdateOrderSchema) {
    await this.orderService.update(id, rate);
  }
}
