import prisma from '@database';
import { Prisma, CardPayment} from '@prisma/client';
import cardPayment from '../controllers/cardPayment';

class CardPaymentRepository {
  async create(
    data: Omit<Prisma.CardPaymentCreateInput, "User">,
    User_id: number
  ): Promise<CardPayment> {
    const cardPayment = await prisma.cardPayment.create({ data: {...data, User: {connect:{id: User_id}}}  });
    
    return cardPayment;
  }

  async delete(
    card_id: string,
  ): Promise<CardPayment> {
    const cardPayment = await prisma.cardPayment.delete({ 
      where: {card_id},
     });
    return cardPayment;
  }
  
  async findUnique(card_number: string, type: string): Promise<CardPayment | null> {
    const cardPayment = await prisma.cardPayment.findUnique({
      where: { card_number_type: {card_number,type} },
    });
    return cardPayment;
  }

  async findByNumber(number: number): Promise<CardPayment[] | null> {
    const cardPayment = await prisma.cardPayment.findMany({
      where: { number },
    });
    return cardPayment;
  }

  async findByCardId(card_id: string): Promise<CardPayment | null> {
    const cardPayment = await prisma.cardPayment.findUnique({
      where: { card_id },
    });
    return cardPayment;
  }

}
export default new CardPaymentRepository();