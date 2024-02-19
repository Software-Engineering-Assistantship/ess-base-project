import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { OrderService } from 'src/interfaces/order-service';

@Controller('/order/:id')
export class DeleteOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    await this.orderService.delete(id);
  }
}
