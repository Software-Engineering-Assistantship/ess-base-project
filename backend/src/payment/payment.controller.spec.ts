import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/database/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPaymentMethod = {
    id: '9a03-7f22c8b8d21d',
    cardNumber: '2222222222222',
    cardHolderName: 'Clara',
    expirationDate: '10/10/2028',
    cvv: 111,
    type: 'credit',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService, PrismaService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  describe('create', () => {
    it('should create a payment method', async () => {
      vi.spyOn(service, 'findByNumber').mockImplementation(() =>
        Promise.resolve(null),
      );

      vi.spyOn(service, 'create').mockImplementation(() =>
        Promise.resolve(mockPaymentMethod),
      );

      expect(await controller.create(mockPaymentMethod)).toBe(
        mockPaymentMethod,
      );
    });

    it('should throw error when card number already exists', async () => {
      const otherCardWithSameNumber = {
        ...mockPaymentMethod,
        cardHolderName: 'Maria Clara',
        expirationDate: '01/01/2025',
        cvv: 123,
      };

      vi.spyOn(service, 'findByNumber').mockImplementation(() =>
        Promise.resolve(mockPaymentMethod),
      );

      try {
        await controller.create(otherCardWithSameNumber);
      } catch (error) {
        expect(error).toEqual(
          new HttpException('Card already exists', HttpStatus.BAD_REQUEST),
        );
      }
    });
  });

  describe('findOne', () => {
    it('should return the card data', async () => {
      vi.spyOn(service, 'findOne').mockImplementation(() =>
        Promise.resolve(mockPaymentMethod),
      );

      expect(await controller.findOne(mockPaymentMethod.id)).toBe(
        mockPaymentMethod,
      );
    });
  });

  describe('findAll', () => {
    it('should return array of payment methods', async () => {
      vi.spyOn(service, 'findAll').mockImplementation(() =>
        Promise.resolve([mockPaymentMethod]),
      );

      expect(await controller.findAll()).toStrictEqual([mockPaymentMethod]);
    });
  });

  describe('update', () => {
    it('should update a payment method', async () => {
      const updatedPayment = { ...mockPaymentMethod, cvv: 100 };

      vi.spyOn(service, 'update').mockImplementation(() =>
        Promise.resolve(updatedPayment),
      );

      expect(await controller.update(updatedPayment.id, updatedPayment)).toBe(
        updatedPayment,
      );
    });
  });

  describe('delete', () => {
    it('should delete a existing payment method', async () => {
      vi.spyOn(service, 'remove').mockImplementation(() =>
        Promise.resolve(mockPaymentMethod),
      );

      expect(await controller.remove(mockPaymentMethod.id)).toBe(
        mockPaymentMethod,
      );
    });
  });
});
