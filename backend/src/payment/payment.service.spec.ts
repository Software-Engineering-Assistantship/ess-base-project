import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';

import { PaymentService } from './payment.service';
import { PrismaService } from 'src/database/prisma.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let firstPaymentId: string;

  const mockPaymentMethod = {
    cardNumber: '22222222222222',
    cardHolderName: 'Clara',
    expirationDate: '10/10/2028',
    cvv: 111,
    type: 'credit',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, PrismaService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  describe('create', () => {
    it('should create a payment', async () => {
      const createdPayment = await service.create(mockPaymentMethod);

      expect(createdPayment).toHaveProperty('id');
      expect(createdPayment['id']).toBeTypeOf('string');

      expect(createdPayment['cardNumber']).toBe(mockPaymentMethod.cardNumber);
      expect(createdPayment['cardHolderName']).toBe(
        mockPaymentMethod.cardHolderName,
      );
      expect(createdPayment['expirationDate']).toBe(
        mockPaymentMethod.expirationDate,
      );
      expect(createdPayment['cvv']).toBe(mockPaymentMethod.cvv);
      expect(createdPayment['type']).toBe(mockPaymentMethod.type);

      firstPaymentId = createdPayment.id;
    });
  });

  describe('findAll', () => {
    it('should find all payment', async () => {
      const payment = await service.findAll();

      expect(payment).toBeTypeOf('object');
      expect(payment.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should find a payment by id', async () => {
      const payment = await service.findOne(firstPaymentId);

      expect(payment).toHaveProperty('id', firstPaymentId);
      expect(payment).toHaveProperty(
        'cardNumber',
        mockPaymentMethod.cardNumber,
      );
      expect(payment).toHaveProperty(
        'cardHolderName',
        mockPaymentMethod.cardHolderName,
      );
      expect(payment).toHaveProperty(
        'expirationDate',
        mockPaymentMethod.expirationDate,
      );
      expect(payment).toHaveProperty('cvv', mockPaymentMethod.cvv);
      expect(payment).toHaveProperty('type', mockPaymentMethod.type);
    });
  });

  describe('findByNumber', () => {
    it('should find a Payment by name', async () => {
      const payment = await service.findByNumber(mockPaymentMethod.cardNumber);

      expect(payment).toHaveProperty('id', firstPaymentId);
      expect(payment).toHaveProperty(
        'cardNumber',
        mockPaymentMethod.cardNumber,
      );
      expect(payment).toHaveProperty(
        'cardHolderName',
        mockPaymentMethod.cardHolderName,
      );
      expect(payment).toHaveProperty(
        'expirationDate',
        mockPaymentMethod.expirationDate,
      );
      expect(payment).toHaveProperty('cvv', mockPaymentMethod.cvv);
      expect(payment).toHaveProperty('type', mockPaymentMethod.type);
    });
  });

  describe('update', () => {
    it('should update a Payment', async () => {
      const newCVV = 124;

      const updatedPayment = await service.update(firstPaymentId, {
        cvv: newCVV,
      });

      expect(updatedPayment).toHaveProperty('id', firstPaymentId);
      expect(updatedPayment).toHaveProperty('cvv', newCVV);
    });
  });

  describe('remove', () => {
    it('should remove a Payment', async () => {
      await service.remove(firstPaymentId);
      const Payment = await service.findOne(firstPaymentId);

      expect(Payment).toBeNull();
    });
  });
});
