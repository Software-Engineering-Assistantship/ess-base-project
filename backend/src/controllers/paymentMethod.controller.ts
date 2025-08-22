import { number, z } from 'zod';
import { Request, Response, Router } from 'express';
import { validateData } from '../middleware/validation-middleware';
import PaymentMethodService from '../services/paymentMethod.service';
import {CardType} from '../enums/paymentMethod-type.enum'


const dateRegex =  /^(0[1-9]|1[0-2])\/\d{4}$/;
const numberValidation = z.string().min(16, { message: 'o numero deve ter 16 digitos' });
const cpfValidation = z.string().min(11, { message: 'o CPF deve ter 11 digitos' });

export interface paymentMethod {
  id: number;
  name: String | null | undefined;
  numCard: String; 
  cvv: number;
  expiryDate: String;
  type: CardType;
  cpf: string
  clientId: number;
}

const payMethodCreate = z.object({
  numCard: z.string().min(1).max(17, {message: "o numero deve ter 16 dígitos"}),
  cvv: z.number().int().min(100, { message: "CVV deve ser um número de 3 digitos entre 100 e 999" }).max(999, { message: "CVV deve ser um nÃºmero de 3 dÃ­gitos entre 100 e 999" }),
  expiryDate: z.string().regex(dateRegex, {message: "Válidade não está no formato correto"}),
  type: z.nativeEnum(CardType),
  clientId: z.number().int(),
  name: z.string().max(50, {message: "Nome não é obrigatório"})
});


export default class PaymentMethodController {

  private payMethodService: PaymentMethodService;
  
  constructor(){
    this.payMethodService = new PaymentMethodService();
  }

  private prefix = '/client/:client_id/paymentMethods/:paymentMethod_id';
  private prefixAll = '/client/:client_id/paymentMethods';
  
  public setupRoutes(router: Router) {
    router.post(this.prefixAll, validateData(payMethodCreate), (req, res) => this.insertPayMethod(req, res));
    router.get(this.prefixAll, (req, res) => this.getAllPayMethod(req, res));
    router.get(this.prefix, (req, res) => this.getPayMethodById(req, res));
    router.delete(this.prefixAll, (req, res) => this.deleteAllPayMethod(req, res));
    router.delete(this.prefix, (req, res) => this.deletePayMethod(req, res));
    router.patch(this.prefix, validateData(payMethodCreate), (req, res) => this.updatePayMethod(req, res));
  }

  private async getAllPayMethod(req: Request, res: Response) {
    try {
      const { client_id } = req.params
      const payMethods = await this.payMethodService.getAllPayMethods(+client_id);
      res.status(200).json(payMethods);
    }catch (error: any){
      res.status(500).json({message: 'Erro ao encontrar todos os metodos de pagamento'});
    }
  }

  private async getPayMethodById(req: Request, res: Response) {
    try {
      const { client_id, paymentMethod_id } = req.params;
      const payMethod = await this.payMethodService.getPayMethodById(+paymentMethod_id);
      res.status(200).json(payMethod);
    } catch (error: any) {
      res.status(500).json({ message: `Error fetching payment method: ${error.message}` });
    }
  }

  private async insertPayMethod(req: Request, res: Response) {
    try {
      const { client_id} = req.params;
      const {name, numCard, cvv, expiryDate, type, clientId, cpf} = req.body;
      const id = await this.payMethodService.insertPaymentMethod(name, numCard, cvv, expiryDate, type, clientId, cpf);
      res.status(201).json({ status: 201, message:`Cartao Cadastrado com Sucesso`});
    } catch (error: any){
      res.status(500).json({message: 'Erro no Cadastro de Metodo de Pagamento'});
    }
  }

  private async deleteAllPayMethod(req: Request, res: Response) {
    const { client_id } = req.params
    await this.payMethodService.deleteAllPayMethods(+client_id)
    try {
      const {client_id, paymentMethod_id } = req.params;
      const payMethod = await this.payMethodService.getPayMethodById(+paymentMethod_id);
      res.status(200).json(payMethod);
    } catch (error: any) {
      res.status(200).json({ status: 200, message:'Todas os Metodos de Pagamento foram deletados com sucesso!'});
    }
  }

  private async deletePayMethod(req: Request, res: Response) {
    try {
      const { cleinte_id, paymentMethod_id } = req.params;
      const payMethod = await this.payMethodService.deletePayMethodById(+paymentMethod_id);
      res.status(200).json({message: 'Metodo de pagamento Deletado com Sucesso'});
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao Deletar Metodo de Pagamento'});
    }
  }

  private async updatePayMethod(req: Request, res: Response) {
    try {
      const { client_id, paymentMethod_id } = req.params;
      const {name, numCard, cvv, expiryDate, type, clientId, cpf} = req.body;
      const payMethod = await this.payMethodService.updatePayMethod(+paymentMethod_id, name, numCard, cvv, expiryDate, type, +client_id, cpf);
      res.status(200).json({message: 'Metodo de Pagamento Alterado com Sucesso'});
    } catch (error: any) {
      res.status(500).json({ message: 'Erro na alteracao de metodo de pagamento'});
    }
  }
}