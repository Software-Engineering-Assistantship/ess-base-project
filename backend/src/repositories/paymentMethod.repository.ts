import { PaymentMethod } from '@prisma/client';
import { paymentMethod } from '../controllers/paymentMethod.controller';
import prisma from '../database';

export default class PaymentMethodRepository {

  async createPaymentMethod(data: any): Promise<number> {
    const payMethod =  await prisma.paymentMethod.create({data});
    return payMethod.id
  }

  async getAllPayMethod(client_id : number): Promise<PaymentMethod[]> {
    const paymentMethods = await prisma.paymentMethod.findMany({
      where: {
        clientId : client_id
      }
    });
    return paymentMethods as PaymentMethod[];
  }



  async getPayMethodById(id: number): Promise<PaymentMethod> {
    const paymentMethod = await prisma.paymentMethod.findUnique({
        where: {
            id : id
        }
    })
    return paymentMethod as PaymentMethod;
  }

  //update by id
  async updatePayMethodById(id: number, params: PaymentMethod): Promise<PaymentMethod> {
    const updatedPayMethod = await prisma.paymentMethod.update({
        where: {
            id: id
        },
        data: params
    });
    return updatedPayMethod as PaymentMethod;
  }

  // delete all
 async deleteAllPayMethod(client_id: number): Promise<void> {
    await prisma.paymentMethod.deleteMany({
      where : {
        clientId : client_id
      }
    });
  }

  //delete by id
  async deletePayMethodById(payMethod_id: number): Promise<PaymentMethod> {
    const deletedPayMethod = await prisma.paymentMethod.delete({
        where: {
            id: payMethod_id,
        },
    });
    return deletedPayMethod as PaymentMethod
  }

  async findPaymentMethodByClientAndCard(clientId: number, numCard: string): Promise<number> {
    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: { // Use a chave composta
          clientId: clientId,
          numCard: numCard,
      },
      select: {
        id: true,
      },
    });

    return paymentMethod?.id ?? -1;
  }
  

  // //delete by id
  // async deletePromotionById(clientId: number, numCard: string): Promise<void> { 
  //   const deleteId = await this.findPaymentMethodByClientAndCard(clientId, numCard);  
  //   if (deleteId !== -1) {
  //     await this.prisma.paymentMethod.delete({
  //       where: { id: deleteId }
  //     });
  //   } else {
  //     console.warn(`Método de pagamento não encontrado para clientId ${clientId} e numCard ${numCard}`);
  //   }
  // }



}