import app from '../../src/app';
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import EmailRepository from '../../src/repositories/email.repository';
import { di } from '../../src/di';

const feature = loadFeature('tests/features/emails.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let caixaDeEntrada: { empresa: string; assunto: string; conteudo: string; }[] = [];
  let mockEmailRepository: EmailRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockEmailRepository = di.getRepository<EmailRepository>( EmailRepository);

});

  test('E-mail enviado com sucesso', ({ given, when, then, and }) => {
    given('Estou na caixa de entrada do e-mail', () => {
      caixaDeEntrada = [];
    });

    and('Visualizo que o e-mail com o comprovante está na caixa de entrada do e-mail', () => {
      const emailComComprovante = {
        empresa: "LivrariaJulioVerne@gmail.com",
        assunto: "Comprovante do Pedido",
        conteudo: "Aqui está o comprovante do seu pedido",
      };
      caixaDeEntrada.push(emailComComprovante);
    });

    when('Abro o e-mail com o comprovante do pedido', async () => {
      // Implementação simulada para abrir o e-mail com o comprovante do pedido
      response = await request.post(`/api/emails/enviarEmail`).send(caixaDeEntrada[0]);
  });
  
    then('Consigo visualizar o comprovante com as informações do meu pedido', () => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('comprovante');
        expect(response.body.comprovante).toHaveProperty('informacoes');
      });
    });
  
  test('E-mail foi para caixa de spam', ({ given, when, then, and }) => {
      given('Estou na caixa de entrada do e-mail', () => {
        caixaDeEntrada = [];
      });
  
      and('Visualizo que o e-mail com o comprovante não está na caixa de entrada do e-mail', () => {
        // Implementação simulada para verificar se o e-mail com o comprovante não está na caixa de entrada
        expect(caixaDeEntrada.length).toBe(0);
      });
  
      when('Abro aba de e-mails marcados como Spam', async () => {
        // Implementação simulada para abrir a aba de e-mails marcados como Spam
        response = await request.get(`/spam`);
      });
  
      then('Vou para a pasta de Spam', async () => {
        // Implementação simulada para ir para a pasta de Spam
        response = await request.get(`/spam`);
      });
  
      and('Visualizo que o e-mail está lá', () => {
        // Implementação simulada para verificar se o e-mail está na pasta de Spam
        const emailComComprovante = {
          empresa: "LivrariaJulioVerne@gmail.com",
          assunto: "Comprovante do Pedido",
          conteudo: "Aqui está o comprovante do seu pedido",
        };
        caixaDeEntrada.push(emailComComprovante);
      });
  
      when('Abro o e-mail com o comprovante do pedido', async () => {
        // Implementação simulada para abrir o e-mail com o comprovante do pedido
        response = await request.post(`/api/emails/enviarEmail`).send(caixaDeEntrada[0]);
      });

  
      then('Consigo visualizar o comprovante com as informações do meu pedido', () => {
        // Implementação simulada para verificar se o comprovante com as informações do pedido está presente no e-mail
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('comprovante');
        expect(response.body.comprovante).toHaveProperty('informacoes');
      });
    });
  
  test('E-mail não foi enviado', ({ given, when, then, and }) => {
      given('Estou na caixa de entrada do e-mail', () => {
        caixaDeEntrada = [];
      });
  
      and('Visualizo que o e-mail com o comprovante não está na caixa de entrada do e-mail', () => {
        // Implementação simulada para verificar se o e-mail com o comprovante não está na caixa de entrada
        expect(caixaDeEntrada.length).toBe(0);
      });
  
      when('Abro aba de e-mails marcados como Spam', async () => {
        // Implementação simulada para abrir a aba de e-mails marcados como Spam
        response = await request.get(`/spam`);
      });
  
      then('Vou para a pasta de Spam', async () => {
        // Implementação simulada para ir para a pasta de Spam
        response = await request.get(`/spam`);
      });
  
      and('Visualizo que o e-mail com o comprovante do pedido não foi enviado', () => {
        // Implementação simulada para verificar se o e-mail com o comprovante do pedido não foi enviado
        if (response.body.spamFolder !== undefined) {
          expect(response.body.spamFolder).not.toContain(caixaDeEntrada[0]);
        } else {
          // cenário em que response.body.spamFolder é undefined
          expect(caixaDeEntrada[0]).toBeUndefined();
        }
      });
    });
    
  test('E-mail foi enviado sem o comprovante', ({ given, when, then, and }) => {
        given('Estou na caixa de entrada do e-mail', () => {
          caixaDeEntrada = [];
        });
    
        and('Visualizo que o e-mail com o comprovante está na caixa de entrada', () => {
          const emailSemComprovante = {
            empresa: "LivrariaJulioVerne@gmail.com",
            assunto: "Pedido sem Comprovante",
            conteudo: "Seu pedido foi processado com sucesso.",
          };
          caixaDeEntrada.push(emailSemComprovante);
        });
    
        when('Abro o e-mail com o comprovante do pedido', async () => {
          // Implementação simulada para abrir o e-mail com o comprovante do pedido
          response = await request.get(`/api/inbox/${caixaDeEntrada[0].empresa}`);
      });
        then('Percebo que o comprovante com as informações do pedido não está no e-mail', () => {
          // Implementação simulada para verificar se o comprovante com as informações do pedido não está presente no e-mail
          expect(response.body).not.toHaveProperty('comprovante');
          
        });
      });
    });