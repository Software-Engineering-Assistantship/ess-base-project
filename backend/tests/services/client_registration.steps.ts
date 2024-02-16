import { loadFeature, defineFeature } from 'jest-cucumber';
import { prismaMock } from '../../setupTests';
import OrderItemEntity from '../../src/entities/OrderItemEntity';
import ClientController from '../../src/controllers/ClientController';


import request from 'supertest';
import app from '../../src/app';

const feature = loadFeature('tests/features/client_registration.feature');
var response: any;
defineFeature(feature, (test) => {

  afterEach(() => {
      jest.clearAllMocks();
  });

  test('E-mail usado no cadastro já está cadastrado', ({ given, when, then,}) => {

    given(/^um cliente cadastrado no sistema com os dados “user1” “(.*)”, email “cvsj@cin.ufpe.br” e senha “(.*)”$/, async (arg1, arg2) =>{
        await prismaMock.client.create({
          data: {
            name: 'user1',
            cpf: '12.332.122/2222-11',
            email: 'cvsj@cin.ufpe.br',
            endereco : 'rua',
            password: arg2,
          },
        }); 
      });
 
      when(/^uma requisição “POST” é enviada com o campo email "(.*)"$/, async (arg0) => {
        const route = '/clients'; // Defina a rota correta para onde você está enviando a requisição POST
        response = await request(app)
          .post(route)
          .send({
            name: 'user2',
            CPF: '12.332.122/2222-11',
            email: arg0,
            endereco: 'rua1',
            password: '12454',
          });
      
      
      });
                  
      then(/^é retornada uma mensagem com status "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(statusCode);
      });

  //    and(/^retorna uma mensagem "(.*)"$/, (message) => {
   //     fail('E-mail já cadastrado');
  //    });

  //    and(/^o cliente "(.*)" não está salvo no banco de dados$/, async (name) => {
  //      ClientController.index()
        //const client = await findClientByName(name); // Supondo que você tenha uma função para encontrar um cliente pelo nome no seu banco de dados
        //expect(client).toBeNull();
   //   });
  });

});
