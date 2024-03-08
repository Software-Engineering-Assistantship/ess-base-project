import EmailEntity from '../entities/email.entity';
import BaseRepository from './base.repository';
import fs from 'fs';
const emailJsonPath = './src/models/emails.json';

class EmailRepository extends BaseRepository<EmailEntity> {
  constructor() {
    super('emails');
  }

  public async sendEmailWithReceipt(data: EmailEntity): Promise<EmailEntity> {
    if(!fs.existsSync(emailJsonPath)){
      fs.writeFileSync(emailJsonPath, '[]');
    }
    const emailJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    const addData = [...emailJson, data];

    fs.writeFileSync(emailJsonPath, JSON.stringify(addData));

    return data;
  }

  public async checkEmailDeliverySuccess(id: string): Promise<EmailEntity | null> {
    const emailJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    if(emailJson.find((email: EmailEntity) => email.id === id)){
      return emailJson.find((email: EmailEntity) => email.id === id);
    }
    
    return null;
  }

  public async checkEmailInSpamFolder(id: string): Promise<EmailEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

      for (let index = 0; index < usersJson.length; index++) {
        if (usersJson[index].id === id) {
          return usersJson[index];
        }
      }
    
    return null;
  }

  public async withoutReceipt(id: string): Promise<EmailEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

      for (let index = 0; index < usersJson.length; index++) {
        if (usersJson[index].id === id) {
          return usersJson[index];
        }
      }
    
    return null;
  }
}

export default EmailRepository