import { EmailEntity } from '../entities/email.entity';
import BaseRepository from './base.repository';
import EmailService from '../services/email.service';

class EmailRepository extends BaseRepository<EmailEntity> {
  private emailService: EmailService;

  constructor(emailService: EmailService) {
    super('emails'); // Define o prefixo para e-mails
    this.emailService = emailService;
  }

  public async sendEmailWithReceipt(email: EmailEntity): Promise<void> {
    // Enviar o e-mail com o comprovante do pedido
    await this.emailService.sendEmailWithReceipt(email);
  }

  public async checkEmailDeliverySuccess(id: string): Promise<boolean> {
    // Verificar se o e-mail foi entregue com sucesso
    return await this.emailService.checkEmailDeliverySuccess(id);
  }

  public async checkEmailInSpamFolder(id: string): Promise<boolean> {
    // Verificar se o e-mail foi enviado para a caixa de spam
    return await this.emailService.checkEmailInSpamFolder(id);
  }

  public async emailNotDelivered(): Promise<void> {
    // Lidar com casos em que o e-mail não foi enviado
    await this.emailService.emailNotDelivered();
  }

  public async withoutReceipt(): Promise<void> {
    // Lidar com casos em que o comprovante não está no e-mail enviado
    await this.emailService.withoutReceipt();
  }

  public async getEmail(id: string): Promise<EmailEntity | null> {
    try {
        // Implemente a lógica para obter o e-mail com base no ID
        const email = await this.findOne((item) => item.id === id);
        return email;
    } catch (error) {
        console.error('Erro ao obter e-mail:', error);
        return null;
    }
}

}

export default EmailRepository;