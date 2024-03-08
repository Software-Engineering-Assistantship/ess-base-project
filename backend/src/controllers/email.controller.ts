import { Router, Request, Response } from 'express';
import EmailService from '../services/email.service';
import EmailEntity from '../entities/email.entity';
import { SuccessResult } from '../utils/result';
import fs from 'fs';
const emailJson = './src/models/emails.json'

class EmailController {
  private prefix: string = '/emails';
  public router: Router;
  private emailService: EmailService;
  private idCount: number = 1;

  constructor(router: Router, emailService: EmailService) {
    this.router = router;
    this.emailService = emailService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.prefix}/enviarEmail`, (req: Request, res: Response) =>
      this.sendEmailWithReceipt(req, res));

    this.router.get(`${this.prefix}/emailEnviado`, (req: Request, res: Response) =>
      this.checkEmailDeliverySuccess(req, res));

    this.router.get(`${this.prefix}/spam`, (req: Request, res: Response) =>
      this.checkEmailInSpamFolder(req, res));

    this.router.get(`${this.prefix}/naoEnviado`, (req: Request, res: Response) =>
      this.emailNotDelivered(req, res));

    this.router.get(`${this.prefix}/semComprovante`, (req: Request, res: Response) =>
      this.withoutReceipt(req, res));
  }

  private async sendEmailWithReceipt(req: Request, res: Response) {
    req.body.id = this.generateId();
  
    // Envie o e-mail com os dados fornecidos
    const email = await this.emailService.sendEmailWithReceipt(new EmailEntity(req.body));

    return new SuccessResult({
      msg: 'E-mail enviado com sucesso',
      data: email
    }).handle(res);
  }

  private async checkEmailDeliverySuccess(req: Request, res: Response) {
    const id = req.params.id;

    const checkEmail = await this. emailService.checkEmailDeliverySuccess(id);

    if (!checkEmail) {
      // Lidar com o caso em que id não é uma string
      return new SuccessResult({
        msg: 'Email não encontrado',
        data: null,
        msgCode: 'email_not_found',
        code: 404
      }).handle(res);
  }

    return new SuccessResult({
      msg: 'E-mail entregue com sucesso',
      data: checkEmail
    }).handle(res);
  }

  private async checkEmailInSpamFolder(req: Request, res: Response) {
    const id = req.params.id;

    const checkEmail = await this. emailService.checkEmailInSpamFolder(id);

    if (!checkEmail) {
      // Lidar com o caso em que id não é uma string
      return new SuccessResult({
        msg: 'Email não esta na caixa de Spam',
        data: null,
        msgCode: 'email_not_found',
        code: 404
      }).handle(res);
  }

    return new SuccessResult({
      msg: 'E-mail está na caixa de Spam',
      data: checkEmail
    }).handle(res);
  }

  private async emailNotDelivered(req: Request, res: Response) {
    const id = req.query.id;

    if (typeof id !== 'string') { 
      // Lidar com o caso em que id não é uma string

      return new SuccessResult({
        msg: 'ID não fornecido ou inválido'
      }).handle(res);
    }
    
    // Tratamento de e-mail não enviado
    await this.emailService.emailNotDelivered(id);
  
    return new SuccessResult({
      msg: 'E-mail não enviado com sucesso'
    }).handle(res);
  }

  private async withoutReceipt(req: Request, res: Response) {
    // E-mail sem comprovante
    const id = req.params.id;

    const checkEmail = await this. emailService.withoutReceipt(id);

    if (!checkEmail) {
      // Lidar com o caso em que id não é uma string
      return new SuccessResult({
        msg: 'E-mail está com comprovante',
        data: null,
        msgCode: 'email_with_receipt',
        code: 404
      }).handle(res);
  }

    return new SuccessResult({
      msg: 'E-mail está sem o comprovante',
      data: checkEmail
    }).handle(res);
  }

  private generateId(): string {
    let id: string;
    try{
      const data = fs.readFileSync(emailJson, 'utf-8');
      const lastId = JSON.parse(data).pop();
      id = lastId.id.toString();
    }catch(err){
      id = '0';
    }
    
    this.idCount = parseInt(id) + 1;
    return this.idCount.toString();
  }
}

export default EmailController;
