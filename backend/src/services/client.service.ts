import bcrypt from 'bcrypt';
import ClientRepository from '../repositories/client.repository';
import jwt from 'jsonwebtoken';
import EmailService from './email.service';
import { generateRecoveryEmailHtml } from '../utils/generateRecoveryEmailHtml';
import {
    HttpConflictError,
    HttpBadRequestError,
    HttpNotFoundError,
} from '../utils/errors/http.error';

export default class ClientService {
    private clientRepository: ClientRepository;

    constructor() {
        this.clientRepository = new ClientRepository();
    }

    async createClient(data: any) {
        // Check if email or username already exists
        const existingClient = await this.clientRepository.findClientByEmailOrUsername(
            data.email,
            data.username,
        );
        if (existingClient) {
            throw new HttpConflictError({ msg: 'E-mail ou nome de usuário já existe.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create the client
        const newClient = await this.clientRepository.createClient({
            ...data,
            password: hashedPassword,
        });
        return newClient;
    }

    async getClientById(id: number) {
        return await this.clientRepository.findClientById(id);
    }

    async updateClient(id: number, data: any) {
        const existingClient = await this.clientRepository.findClientByEmailOrUsername(
            data.email,
            data.username,
        );
        const dataClient = await this.clientRepository.findClientById(id);
        if (existingClient && existingClient.id !== id) {
            throw new HttpConflictError({ msg: 'E-mail ou nome de usuário já existe.' });
        }

        if (dataClient && data && data.password) {
            const cpfDigits = dataClient.cpf.replace(/[^\d]/g, '');
            if (
                data.password.includes(dataClient.name) ||
                data.password.includes(cpfDigits) ||
                data.password.includes(dataClient.birthDate)
            ) {
                throw new HttpBadRequestError({
                    msg: 'A senha não pode conter seu nome, CPF ou data de nascimento',
                });
            }
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedClient = await this.clientRepository.updateClient(id, data);
        if (!updatedClient) {
            throw new HttpNotFoundError({ msg: 'Cliente não encontrado' });
        }
        return updatedClient;
    }

    async deleteClient(id: number) {
        const deletedClient = await this.clientRepository.deleteClient(id);
        if (!deletedClient) {
            throw new Error('Cliente não encontrado');
        }
    }

    async getAllClients() {
        return await this.clientRepository.ListAll();
    }

    async generatePasswordResetToken(email: string) {
        const client = await this.clientRepository.findClientByEmail(email);
        if (!client) {
            throw new HttpNotFoundError({ msg: 'Cliente não encontrado' });
        }

        const token = jwt.sign({ id: client.id, type: 'client' }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });
        const html = generateRecoveryEmailHtml(token);
        await EmailService.sendEmail(email, 'Recupere sua Senha', html);
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
            const dataClient = await this.clientRepository.findClientById(decoded.id);
            if (!dataClient) {
                throw new HttpNotFoundError({ msg: 'Cliente não encontrado' });
            }
            const cpfDigits = dataClient.cpf.replace(/[^\d]/g, '');
            if (
                newPassword.includes(dataClient.name) ||
                newPassword.includes(cpfDigits) ||
                newPassword.includes(dataClient.birthDate)
            ) {
                throw new Error('A senha não pode conter seu nome, CPF ou data de nascimento');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.clientRepository.updateClientPassword(decoded.id, hashedPassword);
        } catch (err) {
            throw new Error('Invalid or expired token');
        }
    }
}
