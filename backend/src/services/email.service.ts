import { EmailEntity } from '../entities/email.entity';
import EmailModel from '../models/email.model';
import EmailRepository from '../repositories/email.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class EmailServiceMessageCode {
  public static readonly email_not_found = 'email_not_found';
}

class EmailService {
  private emailRepository: EmailRepository;

  constructor(emailRepository: EmailRepository) {
    this.emailRepository = emailRepository;
  }

  public async sendEmailWithReceipt(data: EmailEntity): Promise<void> {
    // Enviar o e-mail com o comprovante do pedido
    const emailModel = new EmailModel(data);
    await this.emailRepository.sendEmailWithReceipt(emailModel);
  }

  public async checkEmailDeliverySuccess(id: string): Promise<boolean> {
    // Verificar se o e-mail foi entregue com sucesso
    return await this.emailRepository.checkEmailDeliverySuccess(id);
  }

  public async checkEmailInSpamFolder(id: string): Promise<boolean> {
    // Verificar se o e-mail foi enviado para a caixa de spam
    return await this.emailRepository.checkEmailInSpamFolder(id);
  }

  public async emailNotDelivered(): Promise<void> {
    // Lidar com casos em que o e-mail não foi entregue
    await this.emailRepository.emailNotDelivered();
  }

  public async withoutReceipt(): Promise<void> {
    // Lidar com casos em que o comprovante não está no e-mail enviado
    await this.emailRepository.withoutReceipt();
  }
}

export default EmailService;
