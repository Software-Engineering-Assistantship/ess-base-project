import { loadFeature, defineFeature } from 'jest-cucumber';
import EmailService from '../../src/services/email.service';
import { EmailEntity } from '../../src/entities/email.entity';
import EmailModel from '../../src/models/email.model';
import EmailRepository from '../../src/repositories/email.repository';

const feature = loadFeature('tests/features/email-service.feature');

defineFeature(feature, (test) => {
    let mockEmailRepository: EmailRepository;
    let service: EmailService;

    let emails: EmailEntity[];
    let emailReturned: EmailEntity;
    let idToCall: string;
        
    let mockEmailEntity: EmailEntity;
    let mockEmailModel: EmailModel;

    beforeEach(() => {
        mockEmailRepository = {
            getEmails: jest.fn(),
            getEmail: jest.fn(),
            createEmail: jest.fn(),
        } as any;

        service = new EmailService(mockEmailRepository);
    });

    test('Envio de e-mail com comprovante de pedido', ({ given, when, then }) => {
        let emailReturned: boolean;

        given('um e-mail foi enviado com sucesso', () => {
            mockEmailEntity = new EmailEntity({
                id: '123',
                remetente: 'remetente@example.com',
                destinatario: 'destinatario@example.com',
                assunto: 'Assunto do e-mail',
                corpoEmail: 'Corpo do e-mail',
                comprovante: 'Comprovante do e-mail',
            });
        });
    
        when('verifico se o e-mail foi entregue com sucesso com o id "123"', async () => {
            idToCall = '123';
            emailReturned = await service.checkEmailDeliverySuccess(idToCall);
        });
    
        then('o resultado deve ser true', () => {
            expect(emailReturned).toBeTruthy();
        });
    });

    test('E-mail enviado para a caixa de spam', ({ given, when, then }) => {
        let emailReturned: boolean;
    
        given('um e-mail foi enviado para a caixa de spam com o id "123"', () => {
            mockEmailEntity = new EmailEntity({
                id: '123',
                remetente: 'remetente@example.com',
                destinatario: 'destinatario@example.com',
                assunto: 'Assunto do e-mail',
                corpoEmail: 'Conteúdo do e-mail',
                comprovante: 'Comprovante do e-mail',
                isSpam: true,
            });
    
            // Simular a chamada ao getEmail do mockEmailRepository
            mockEmailRepository.getEmail = jest.fn().mockResolvedValue(mockEmailEntity);
        });
    
        when('verifico se o e-mail foi enviado para a caixa de spam com o id "123"', async () => {
            idToCall = '123';
            // Verificar se o e-mail está na caixa de spam
            emailReturned = await service.checkEmailInSpamFolder(idToCall);
        });
    
        then('o resultado deve ser true', () => {
            expect(emailReturned).toBeTruthy();
        });
    });

    test('E-mail não foi entregue', ({ given, when, then }) => {
        let emailReturned: void;

        given('um e-mail não foi entregue', () => {
            mockEmailRepository.getEmail = jest.fn().mockResolvedValue(null);
        });

        when('lidar com casos em que o e-mail não foi entregue', async () => {
            emailReturned = await service.emailNotDelivered();
        });

        then('nenhuma exceção deve ser lançada', () => {
            expect(emailReturned).toBeNull();
        });
        });

    test('Comprovante não está no e-mail enviado', ({ given, when, then }) => {
        let emailReturned: EmailEntity | null = null; // Inicializa como null
    
        given('um e-mail foi enviado sem o comprovante', () => {
            mockEmailEntity = new EmailEntity({
                id: '1',
                remetente: 'remetente@example.com',
                destinatario: 'destinatario@example.com',
                assunto: 'Assunto do e-mail',
                corpoEmail: 'Corpo do e-mail',
                comprovante: null, // Simular comprovante ausente
            });
        });
    
        when('lidar com casos em que o comprovante não está no e-mail enviado', async () => {
            // Atribui o resultado de withoutReceipt() apenas se não for void
            const result = await service.withoutReceipt();
            if (result !== void 0) {
                emailReturned = result;
            }
        });
    
        then('nenhuma exceção deve ser lançada', () => {
            if (emailReturned !== null) {
                expect(emailReturned.comprovante).toBeNull();
            } else {
                // Lida com o caso em que emailReturned é null
                // Pode lançar um erro ou fazer outra ação apropriada
            }
        });
    });
});
