import EmailEntity from '../entities/email.entity';
import EmailModel from '../models/email.model';
import EmailRepository from '../repositories/email.repository';
import fs from 'fs';
const emailJsonPath = './src/models/emails.json';

class EmailService {
  private emailRepository: EmailRepository;

  constructor(emailRepository: EmailRepository) {
    this.emailRepository = emailRepository;
  }

  public async sendEmailWithReceipt(data: EmailEntity): Promise<EmailModel> {

    const emailEntity = await this.emailRepository.sendEmailWithReceipt(data);
    const emailModel = new EmailModel(emailEntity);

    return emailModel;
  }

  public async checkEmailDeliverySuccess(id: string): Promise<EmailModel | null> {
    // Verificar se o e-mail foi entregue

    const emailEntity = await this.emailRepository.checkEmailDeliverySuccess(id);
    const emailModel = emailEntity ? new EmailModel(emailEntity) : null;

    return emailModel;
  }

  public async checkEmailInSpamFolder(id: string): Promise<boolean> {
    // Verificar se o e-mail foi enviado para a caixa de spam
    const emailJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    const email = emailJson.find((email: any) => email.id === id);

    if (!email) {
        throw new Error(`Email com o ID: ${id} não encontrado`);
    }

    return !email.isDelivered;
}

  public async withoutReceipt(id: string): Promise<string> {
    // Lidar com casos em que o e-mail está sem o comprovante
    const emailJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    const email = emailJson.find((email: any) => email.id === id);

    if (!email) {
      throw new Error(`Email com o ID: ${id} não encontrado`);
    }

    if (email.comprovante) {
      return `O Email com o ID: ${id} possui comprovante`;
    } else {
      return `O Email com o ID: ${id} não possui comprovante`;
    }}
}

export default EmailService;
