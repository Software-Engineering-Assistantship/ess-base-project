// import { PrismaClient } from '@prisma/client';
// import database from '../database/connection';
// import { CardPaymentRepository } from '@repositories';

// const prismaTestClient = new PrismaClient();

// describe('DeliveryPerson Controller', () => {
//   beforeAll(async () => {
//     await database.clearValues();
//     await database.connect();
//   });

//   afterAll(async () => {
//     await database.clearValues();
//     await database.disconnect();
//   });

//   const exampleUser = {
//     userData: {
//         cpf: '11111111111',
//         name: 'José',

//     }
// ,
//     cardPaymentData: {
//         number: { connect: { cpf: '11111111111' } },
//         card_id: '123abc',
//         card_number: '9999 9999 9999 9999',
//         name: 'José',
//         expire_date: '12/2028',
//         password: '111111',
//         type: 'credit',
//         cvv: '123'
//     }
//   };

//   it('should create a card', async () => {
//     const card = await prismaTestClient.cardPayment.create({
//       data: exampleUser.cardPaymentData,
//     });

//     expect(card).toHaveProperty('card_number', exampleUser.cardPaymentData.card_number);
//     expect(card).toHaveProperty('name', exampleUser.cardPaymentData.name);
//     expect(card).toHaveProperty('expire_date', exampleUser.cardPaymentData.expire_date);
//     expect(card).toHaveProperty('password', exampleUser.cardPaymentData.password);
//     expect(card).toHaveProperty('type', exampleUser.cardPaymentData.type);
//     expect(card).toHaveProperty('cvv', exampleUser.cardPaymentData.cvv);
//   });

//   it('should find a card by card_number and type', async () => {
//     const userFound = await prismaTestClient.cardPayment.findUnique({
//       where: { card_number: exampleUser.cardPaymentData.card_number, type: exampleUser.cardPaymentData.type },
//     });

//     expect(userFound).not.toBeNull();
//   });

//   it('should find a card by number', async () => {
//     const userFound = await prismaTestClient.cardPayment.findUnique({
//       where: { number: exampleUser.cardPaymentData.number },
//     });

//     expect(userFound).not.toBeNull();
//   });

//   it('should find a card by card_id', async () => {
//     const userFound = await prismaTestClient.cardPayment.findUnique({
//       where: { card_id: exampleUser.cardPaymentData.card_id },
//     });

//     expect(userFound).not.toBeNull();
//   });

//   it('should delete a user', async () => {
//     const userDeleted = await CardPaymentRepository.delete(exampleUser.cardPaymentData.card_id);

//     expect(userDeleted).toBe(null)
//   });
// });