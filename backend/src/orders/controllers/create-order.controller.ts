import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { createOrderSchema, CreateOrderSchema } from '../dto/create-order';
import { OrderService } from 'src/interfaces/order-service';

@Controller('order')
export class CreateOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() order: CreateOrderSchema) {
    try {
      createOrderSchema.parse(order);

      return await this.orderService.create({
        comment: order.comment,
        rate: order.rate,
        menuItems: order.menuItems,
      });
    } catch (error) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }
  }
}
