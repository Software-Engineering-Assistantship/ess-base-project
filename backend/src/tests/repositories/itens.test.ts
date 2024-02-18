import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const feature = loadFeature('../backend/src/tests/features/itens-cadastro.feature');
const prismaTestClient = new PrismaClient();
let apiResponse: request.Response;

describe('Itens Repository', () => {
  beforeAll(async () => {
    await database.clearValues();
    await database.connect();
  });

  afterAll(async () => {
    await database.clearValues();
    await database.disconnect();
  });

  const item ={
    name: 'Camiseta',
    price: 29.99,
    category: 'Vestuário',
    description: 'Camiseta de algodão',
    image: 'image.jpg',
    colors: 'Azul, Vermelho, Verde',
    sizes: 'P, M, G',
    amount: 10
  };

  it('should create a item', async () => {
    const newItem = await prismaTestClient.item.create({ data: item });

    expect(newItem).toHaveProperty('id', 1);
    expect(newItem).toHaveProperty('name', item.name);
    expect(newItem).toHaveProperty('price', item.price);
    expect(newItem).toHaveProperty('category', item.category);
    expect(newItem).toHaveProperty('description', item.description);
    expect(newItem).toHaveProperty('image', item.image);
    expect(newItem).toHaveProperty('colors', item.colors);
    expect(newItem).toHaveProperty('sizes', item.sizes);
    expect(newItem).toHaveProperty('amount', item.amount);
  }
  );

  it ('should find a item by id', async () => {
    const itemFound = await prismaTestClient.item.findFirst({ where: { id: 1 } });

    expect(itemFound).not.toBeNull();
  });

  it ('should find all items', async () => {
    const items = await prismaTestClient.item.findMany();

    expect(items).toHaveLength(1);
  });
  
  it ('should update a item', async () => {
    const itemUpdated = await prismaTestClient.item.update({
      where: { id: 1 },
      data: { name: 'Calça' },
    });

    expect(itemUpdated).toHaveProperty('id', 1);
    expect(itemUpdated).toHaveProperty('name', 'Calça');
  }
  );
  it ('should delete a item', async () => {
    const itemDeleted = await prismaTestClient.item.delete({ where: { id: 1 } });

    expect(itemDeleted).toHaveProperty('id', 1);
  });

});