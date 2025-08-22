import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import { prismaMock } from "../../setupTests";
import { CardType, PaymentMethod, Client } from "@prisma/client";
import SetupDatabaseTest from "../../src/database/setupDatabaseTest";

const feature = loadFeature('tests/features/payMethod.feature');
const request = supertest(app);

// FunÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o auxiliar para criar um mÃƒÆ’Ã‚Â©todo de pagamento simulado
const createPaymentMethod = (name: string, numCard: string, cvv: number, expiryDate: string, type: CardType, cpf: string): Omit<PaymentMethod, 'id'> => {
    return {
        name,
        numCard,
        cvv,
        expiryDate,
        type,
        cpf,
        clientId: 1, // Assumimos que o ID do cliente ÃƒÆ’Ã‚Â© 1 para simplicidade
    };
};

const createClient = async () => {
    return{
        id: 1,
        name: 'Victoria Cesar',
        email: 'vic@email.com', 
        username: 'viccesar', 
        phone: '81998713499',
        password: '123',
        cpf: '70558989438',
        birthDate: '2003-04-24',
    }
}

defineFeature(feature, (test) => {
    let response: supertest.Response;
    let paymentMethods: PaymentMethod[] = [];
    let clients: Client[] = [];

    const setupDBTest = new SetupDatabaseTest();
    
    //setupDBTest.resetDatabase();

    beforeEach(async () => {
        paymentMethods = [];
        clients = [];
        await setupDBTest.resetDatabase();
     });
        
    afterEach(async () => {
        paymentMethods = [];
        clients = [];
        await setupDBTest.resetDatabase();
    });

    const givenNoPaymentMethod = (given: DefineStepFunction) =>
        given(/^nenhum metodo de pagamento esta cadastrado$/, async () => {
            const cliente = await createClient();
            clients.push(cliente);
            prismaMock.client.findUnique.mockResolvedValue(cliente);
            paymentMethods = [];
            prismaMock.paymentMethod.findMany.mockResolvedValue([]);
        });

    const givenPaymentMethodExists = (given: DefineStepFunction) =>
        given(/^o metodo de pagamento "(.*)" esta cadastrado com o tipo "(.*)"$/, async (name, type) => {
            const cliente = await createClient();
            clients.push(cliente);
            prismaMock.client.findUnique.mockResolvedValue(cliente);
            const existingPaymentMethod: PaymentMethod = {
                ...createPaymentMethod(name, '4111111111111111', 123, '07/2030', type as CardType, '12345678909'),
                id: paymentMethods.length + 1,
            };
            paymentMethods.push(existingPaymentMethod);
            prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
        });
        
    const givenPaymentMethodExistsDelete = (given: DefineStepFunction) =>
      given(/^o metodo de pagamento "(.*)" esta cadastrado$/, async (name) => {
          const cliente = await createClient();
          clients.push(cliente);
          prismaMock.client.findUnique.mockResolvedValue(cliente);
          const existingPaymentMethod: PaymentMethod = {
              ...createPaymentMethod(name, '4111111111111111', 123, '07/2030', 'CREDITO', '12345678909'),
              id: paymentMethods.length + 1,
          };
          paymentMethods.push(existingPaymentMethod);
          prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
        });

    const whenCreateNewPaymentMethod = (when: DefineStepFunction) =>
        when(  /^cadastro um novo metodo de pagamento com nome "(.*?)", numCard "(.*?)", cvv "(.*?)", validade "(.*?)", tipo "(.*?)", cpf "(.*?)"$/,
            async (name: string, numCard: string, cvv: string, expiryDate: string, type: CardType, cpf: string) => {
            if (paymentMethods[0]){
                await setupDBTest.setupDataBaseForPayMethodsTest(clients[0],paymentMethods[0]);
            } else {
                await setupDBTest.setupDataBaseForPayMethodsTest(clients[0]);
            }
            const newPaymentMethod = createPaymentMethod(name, numCard, parseInt(cvv), expiryDate, type, cpf);
            const savedPaymentMethod: PaymentMethod = { ...newPaymentMethod, id: paymentMethods.length + 1 };
            paymentMethods.push(savedPaymentMethod);
            prismaMock.paymentMethod.create.mockResolvedValue(savedPaymentMethod);
            response = await request.post('/client/1/paymentMethods').send(newPaymentMethod);
        });
        
    const whenUpdatePaymentMethod = (when: DefineStepFunction) =>
        when(/^altero o metodo de pagamento "(.*)" para o tipo "(.*)"$/, async (name, newType) => {
           // console.log(paymentMethods[0])
            await setupDBTest.setupDataBaseForPayMethodsTest(clients[0],paymentMethods[0]);
            const paymentMethod = paymentMethods.find(method => method.name === name);
            if (paymentMethod) {
                paymentMethod.type = newType as CardType;
                prismaMock.paymentMethod.update.mockResolvedValue(paymentMethod);
                response = await request.patch(`/client/1/paymentMethods/${paymentMethod.id}`).send(paymentMethod);
            }
        });
        
    const whenDeletePaymentMethod = (when: DefineStepFunction) =>
      when(/^deleto o metodo de pagamento "(.*)"$/, async (name) => {
          await setupDBTest.setupDataBaseForPayMethodsTest(clients[0], paymentMethods[0]);
          const paymentMethod = paymentMethods.find(method => method.name === name);
          if (paymentMethod) {
              paymentMethods = paymentMethods.filter(method => method.name !== name);
              prismaMock.paymentMethod.delete.mockResolvedValue(paymentMethod);
              response = await request.delete(`/client/1/paymentMethods/${paymentMethod.id}`);
          }
      });


    const thenSeeSuccessMessage = (then: DefineStepFunction) =>
        then(/^vejo a mensagem "(.*)"$/, async (message) => {
            expect(response.body.message).toEqual(message);
        });

    const thenSeePaymentMethodOnList = (then: DefineStepFunction) =>
        then(/^vejo "(.*)" na lista de metodos de pagamento$/, async (name) => {
            prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
            const res = await request.get('/client/1/paymentMethods');
            expect(res.body.some((method: PaymentMethod) => method.name === name)).toBe(true);
        });

    const thenSeeUpdatedPaymentMethodOnList = (then: DefineStepFunction) =>
        then(/^vejo "(.*)" com o tipo "(.*)" na lista de metodos de pagamento$/, async (name, type) => {
            prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
            const res = await request.get('/client/1/paymentMethods');
            expect(res.body.some((method: PaymentMethod) => method.name === name && method.type === type)).toBe(true);
        });

    const thenDoNotSeePaymentMethodOnList = (and: DefineStepFunction) =>
      and(/^nao vejo "(.*)" na lista de metodos de pagamento$/, async (name) => {
          prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
          const res = await request.get('/client/1/paymentMethods');
          expect(res.body.some((method: PaymentMethod) => method.name === name)).toBe(false);
      });
    

    const givenPaymentMethodExistsWithData = (given: DefineStepFunction) =>
      given(/^o metodo de pagamento "(.*)" esta cadastrado com numCard "(.*)", cvv "(.*)", validade "(.*)", tipo "(.*)", cpf "(.*)"$/, async (name, numCard, cvv, validade, tipo, cpf) => {
          const cliente = await createClient();
          clients.push(cliente);
          prismaMock.client.findUnique.mockResolvedValue(cliente);
          const existingPaymentMethod: PaymentMethod = {
              ...createPaymentMethod(name, numCard, parseInt(cvv), validade, tipo as CardType, cpf),
              id: paymentMethods.length + 1,
          };
          paymentMethods.push(existingPaymentMethod);
          prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
      });

    test('Cadastrar Metodo de pagamento com sucesso', ({ given, when, then }) => {
        givenNoPaymentMethod(given);
        whenCreateNewPaymentMethod(when);
        thenSeeSuccessMessage(then);
        thenSeePaymentMethodOnList(then);
    });

    test('Alterar metodo de pagamento com sucesso', ({ given, when, then }) => {
        givenPaymentMethodExists(given);
        whenUpdatePaymentMethod(when);
        thenSeeSuccessMessage(then);
        thenSeeUpdatedPaymentMethodOnList(then);
    });

    test('Deletar Metodo de Pagamento com Sucesso', ({ given, when, then, and }) => {
      givenPaymentMethodExistsDelete(given);
      whenDeletePaymentMethod(when);
      thenSeeSuccessMessage(then);
      thenDoNotSeePaymentMethodOnList(and);
    });

    test('Tentativa de Cadastro de Metodo de pagamento ja cadastrado', ({ given, when, then }) => {
      givenPaymentMethodExistsWithData(given);
      whenCreateNewPaymentMethod(when);
      thenSeeSuccessMessage(then);
      thenSeePaymentMethodOnList(then);
    });
});


