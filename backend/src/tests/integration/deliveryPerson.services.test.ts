import { PrismaClient } from '@prisma/client';
import database from '../database/connection';

const prismaTestClient = new PrismaClient();

describe('DeliveryPerson Controller', () => {
  beforeAll(async () => {
    await database.clearValues();
    await database.connect();
  });

  afterAll(async () => {
    await database.clearValues();
    await database.disconnect();
  });

  const exampleUser = {
    deliveryPersonData: {
      name: 'paula perazzo',
      cpf: '22922',
      email: 'paula@gmail.com',
      phone: '3333-3333',
      status: 'active',
    },
    addressData: {
      postalCode: '82892',
      street: 'da arvore',
      number: '89',
      district: 'boa viagem',
      state: 'pernambuco',
      city: 'recife',
      DeliveryPerson: { connect: { cpf: '22922' } },
    },
  };

  it('should create a delivery person', async () => {
    const user = await prismaTestClient.deliveryPerson.create({
      data: exampleUser.deliveryPersonData,
    });
    const address = await prismaTestClient.address.create({
      data: exampleUser.addressData,
    });
    expect(user).toHaveProperty('name', exampleUser.deliveryPersonData.name);
    expect(user).toHaveProperty('email', exampleUser.deliveryPersonData.email);
    expect(user).toHaveProperty('cpf', exampleUser.deliveryPersonData.cpf);
    expect(user).toHaveProperty('phone', exampleUser.deliveryPersonData.phone);
    expect(user).toHaveProperty(
      'status',
      exampleUser.deliveryPersonData.status,
    );
    expect(address).toHaveProperty(
      'postalCode',
      exampleUser.addressData.postalCode,
    );
    expect(address).toHaveProperty('street', exampleUser.addressData.street);
    expect(address).toHaveProperty('number', exampleUser.addressData.number);
    expect(address).toHaveProperty(
      'district',
      exampleUser.addressData.district,
    );
    expect(address).toHaveProperty('state', exampleUser.addressData.state);
    expect(address).toHaveProperty('city', exampleUser.addressData.city);
  });

  it('should find a user by cpf', async () => {
    const userFound = await prismaTestClient.deliveryPerson.findUnique({
      where: { cpf: exampleUser.deliveryPersonData.cpf },
    });

    expect(userFound).not.toBeNull();
  });
  it('should update a user', async () => {
    const userUpdated = await prismaTestClient.deliveryPerson.update({
      where: { cpf: '22922' },
      data: { name: 'Ciclano' },
    });

    expect(userUpdated).toHaveProperty('cpf', '22922');
    expect(userUpdated).toHaveProperty('name', 'Ciclano');
  });
});
