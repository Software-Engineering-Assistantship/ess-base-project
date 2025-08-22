import bcrypt from 'bcrypt';
import HotelierRepository from "../repositories/hotelier.repository";
import EmailService from './email.service';
import jwt from 'jsonwebtoken';
import { generateRecoveryEmailHtml } from '../utils/generateRecoveryEmailHtml'

export default class HotelierService {
  private hotelierRepository: HotelierRepository;

  constructor() {
    this.hotelierRepository = new HotelierRepository();
  }

  async createHotelier(data: any) {
    // Checar se o email ou usuário já existe
    const existingHotelier = await this.hotelierRepository.findHotelierByEmailOrUsername(data.email, data.username);
    if (existingHotelier) {
      throw new Error('Email ou usuário já existente.');
    }
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar o hotelier
    const newHotelier = await this.hotelierRepository.createHotelier({ ...data, password: hashedPassword });
    return newHotelier;
  }

  
  async getHotelierById(id: number) {
    return await this.hotelierRepository.findHotelierById(id);
}

async updateHotelier(id: number, data: any) {
  const existingHotelier = await this.hotelierRepository.findHotelierByEmailOrUsername(data.email, data.username);
  const dataHotelier = await this.hotelierRepository.findHotelierById(id);
  //const dataClient = this.getClientById(id);
  if (existingHotelier && existingHotelier.id !== id) {
      throw new Error('Email ou Usuário já existente');
  }

  if (data && dataHotelier && data.password && dataHotelier.password) {
    const cnpjDigits = dataHotelier.cnpj.replace(/[^\d]/g, '');
      if (data.password.includes(dataHotelier.name) || data.password.includes(cnpjDigits) || data.password.includes(dataHotelier.hotel)) {
          throw new Error('A senha não pode conter seu nome, CNPJ ou o nome do seu Hotel');
      }
      data.password = await bcrypt.hash(data.password, 10);
  }

  const updatedHotelier = await this.hotelierRepository.updateHotelier(id, data);
  if (!updatedHotelier) {
      throw new Error('Hoteleiro não encontrado');
  }
  return updatedHotelier;
}

async deleteHotelier(id: number) {
    const deletedHotelier = await this.hotelierRepository.deleteHotelier(id);
    if (!deletedHotelier) {
        throw new Error('Hoteleiro não encontrado');
    }
}

async getAllHoteliers() {
  return await this.hotelierRepository.ListAll();
}

async generatePasswordResetToken(email: string) {
  const hotelier = await this.hotelierRepository.findHotelierByEmail(email);
  if (!hotelier) {
    throw new Error('Hoteleiro não encontrado');
  }

  const token = jwt.sign({ id: hotelier.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  const html =  generateRecoveryEmailHtml(token);
  await EmailService.sendEmail(email, 'Recupere sua Senha', html);
}

async resetPassword(token: string, newPassword: string) {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const dataHotelier = await this.hotelierRepository.findHotelierById(decoded.id);
    if (!dataHotelier) {
      throw new Error('Hoteleiro não encontrado');
    }
    const cnpjDigits = dataHotelier.cnpj.replace(/[^\d]/g, '');
    if (newPassword.includes(dataHotelier.name) || newPassword.includes(cnpjDigits) || newPassword.includes(dataHotelier.hotel)) {
          throw new Error('A senha não pode conter seu nome, CNPJ ou o nome do seu Hotel');
      }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.hotelierRepository.updateHotelierPassword(decoded.id, hashedPassword);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
}
