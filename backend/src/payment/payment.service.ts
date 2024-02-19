import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return await this.prisma.payment.create({
      data: createPaymentDto,
    });
  }

  async findAll() {
    return await this.prisma.payment.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.payment.findUnique({ where: { id } });
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.payment.delete({ where: { id } });
  }

  async findByNumber(cardNumber: string) {
    return await this.prisma.payment.findFirst({ where: { cardNumber } });
  }
}
