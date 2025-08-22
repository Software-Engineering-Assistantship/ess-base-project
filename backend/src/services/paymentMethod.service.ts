import { CardType, PaymentMethod } from '@prisma/client';
import PaymentMethodRepository from '../repositories/paymentMethod.repository';
import { HttpBadRequestError, HttpError, HttpInternalServerError, HttpNotFoundError } from '../utils/errors/http.error';

export default class PaymentMethodService {
  private paymentMethodRepository: PaymentMethodRepository;

  constructor() {
    this.paymentMethodRepository = new PaymentMethodRepository();
  }

  
  private preparePayMethodParams(name: string | null | undefined, numCard: string, cvv: number, expiryDate: string, type: CardType, clientId: number, cpf: string): PaymentMethod {
    
    if (!(cvv >= 100 && cvv <= 999)) {
        throw new HttpBadRequestError({
          msg: 'cvv format wrong, cvv: ' + cvv
        });
    }

    //TODO : colocar regex de cpf
    if (cpf.length != 11) {
        throw new HttpBadRequestError({
          msg: 'cpf is required, cpf: ' + cpf
      });
    }

    //TODO :  colocar regex de expiryDate
    if(expiryDate.length != 7){
        throw new HttpBadRequestError({
          msg: 'expiry Date wrong format, date: ' + expiryDate
      });
    }

    if (numCard.toString().length != 16) {
        throw new HttpBadRequestError({
          msg: 'numCard is required, numCard: ' + numCard
      });
    }
    let params = {name, numCard, cvv, expiryDate, type, clientId, cpf} as PaymentMethod;
    return params;
}

  //insert
  async insertPaymentMethod(name: string | null | undefined, numCard: string, cvv: number, expiryDate: string, type: CardType, clientId: number, cpf: string): Promise<number>{
    // Check if the payment Method alredy exists to this Client 
    let params = this.preparePayMethodParams(name, numCard, cvv, expiryDate, type, clientId, cpf);

    const existingPayMethod = await this.paymentMethodRepository.findPaymentMethodByClientAndCard(params.clientId, params.numCard);
    if (existingPayMethod != -1) {
      throw new Error('Payment Method already exists');
    }
    // Create the Payment Method
    const newPayMethod = await this.paymentMethodRepository.createPaymentMethod(params);

    return newPayMethod;
  }

  async getAllPayMethods(client_id: number): Promise<PaymentMethod[]> {
    try {
      return await this.paymentMethodRepository.getAllPayMethod(client_id);
    } catch (error: any) {
      throw new HttpInternalServerError({ msg: `Error getting all payment methods: ${error.message}` });
    }
  }
  

  async getPayMethodById(paymentMethodId: number): Promise<PaymentMethod> {
    try{
        //TODO: integrar com cliente
        const payMethod = await this.paymentMethodRepository.getPayMethodById(paymentMethodId)
        if (!payMethod) {
            throw new HttpNotFoundError({
                msg: 'Payment Method not found'
            });
        }
        return payMethod;
    }catch(error: any){
        if (error instanceof HttpError){
            throw error;
        }else{
            throw new HttpInternalServerError({msg: `Error fetching payment Method: ${error.message}`});
        }
    }
}

  async updatePayMethod(payMethod_id: number, name: string | null | undefined, numCard: string, cvv: number, expiryDate: string, type: CardType, clientId: number, cpf: string): Promise<PaymentMethod> {
      const params = this.preparePayMethodParams(name, numCard, cvv, expiryDate, type, clientId, cpf) as PaymentMethod;
      const payMethod = this.paymentMethodRepository.getPayMethodById(payMethod_id);
      try{
          if (!payMethod) {
              throw new HttpNotFoundError({
                  msg: 'Payment Method not found'
              });
          }
          const updatedPayMethod = await this.paymentMethodRepository.updatePayMethodById(payMethod_id, params);
          return updatedPayMethod;
      }catch(error: any){
          if (error instanceof HttpError){
              throw error;
          }else{
              throw new HttpInternalServerError({msg: `Error updating payment Method: ${error.message}`});
          }
      }
  }

  async deletePayMethodById(paymentMethod_id: number): Promise<PaymentMethod> {

        const payMethod = this.paymentMethodRepository.getPayMethodById(paymentMethod_id);
        try{
            if (!payMethod) {
                  throw new HttpNotFoundError({
                      msg: 'Payment Method not found'
                  });
            }
           const deletedPayMethod = await this.paymentMethodRepository.deletePayMethodById(paymentMethod_id); 
           return deletedPayMethod;
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: paymentMethod_id + ` Error deleting payment Method: ${error.message}`});
            }
        }
    }

  //delete all
  async deleteAllPayMethods(client_id: number): Promise<void> {
    try{
        await this.paymentMethodRepository.deleteAllPayMethod(client_id);
    }catch(error: any){
        throw new HttpInternalServerError({msg: `Error deleting all payment methods: ${error.message}`});
    }
  }


}