import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const feature = loadFeature('../backend/src/tests/features/itens-cadastro.feature');
const prismaTestClient = new PrismaClient();
let apiResponse: request.Response;

defineFeature(feature, test => {

  beforeAll(async () => {
    await database.clearValues();
    await database.connect();
  });

  afterAll(async () => {
    await database.clearValues();
    await database.disconnect();
  });
  
    
  test('Criar Item', ({ given, when, then, and }) => {
    given(/^Eu não tenho nenhum item com nome "(.*)"$/, async (name) => {
      const itemExists = await prismaTestClient.item.findFirst({
        where: {
          name
        }
      });

      expect(itemExists).toBe(null);
    });

    when(/^Eu insiro um item com: nome "(.*)", preço (.+), categoria "(.*)", descrição "(.*)", imagem "(.*)", cores "(.*)", tamanhos "(.*)", quantidade (.+)$/, async (
      name, price, category, description, image, colors, sizes, amount
    ) => {
      const newItem = await prismaTestClient.item.create({
        data: {
          name,
          price: Number(price),
          category,
          description,
          image,
          colors,
          sizes,
          amount: Number(amount)
        }
      })

      expect(newItem).toHaveProperty('name', name);
      expect(newItem).toHaveProperty('price', Number(price));
      expect(newItem).toHaveProperty('category', category);
      expect(newItem).toHaveProperty('description', description);
      expect(newItem).toHaveProperty('image', image);
      expect(newItem).toHaveProperty('colors', colors);
      expect(newItem).toHaveProperty('sizes', sizes);
      expect(newItem).toHaveProperty('amount', Number(amount));
    });

    then(/^Eu devo ter um item com nome "(.*)"$/, async (name) => {
      const item = await prismaTestClient.item.findFirst({
        where: {
          name,
        }
      });

      expect(item).toHaveProperty('name', name);
    });

    and(/^Eu devo ter este item com id "(.*)"$/, async (id) => {
      const item = await prismaTestClient.item.findFirst({
        where: {
          id: Number(id),
        }
      });

      expect(item).toHaveProperty('id', Number(id));
    });

  });

test('Atualizar Item', ({ given, when, then, and }) => {
    given(/^Eu tenho um item com id "(.*)"$/, async (id) => {
        const item = await prismaTestClient.item.findFirst({
        where: {
            id: Number(id),
        }
        });
    
        expect(item).toHaveProperty('id', Number(id));
    });
    
    when(/^Eu atualizo o item com id "(.*)" para: nome "(.*)", preço (.+), categoria "(.*)", descrição "(.*)", imagem "(.*)", cores "(.*)", tamanhos "(.*)", quantidade (.+)$/, async (
        id, name, price, category, description, image, colors, sizes, amount
    ) => {
        const itemUpdated = await prismaTestClient.item.update({
        where: { id: Number(id) },
        data: {
            name,
            price: Number(price),
            category,
            description,
            image,
            colors,
            sizes,
            amount: Number(amount)
        }
        });
    
        expect(itemUpdated).toHaveProperty('id', Number(id));
        expect(itemUpdated).toHaveProperty('name', name);
        expect(itemUpdated).toHaveProperty('price', Number(price));
        expect(itemUpdated).toHaveProperty('category', category);
        expect(itemUpdated).toHaveProperty('description', description);
        expect(itemUpdated).toHaveProperty('image', image);
        expect(itemUpdated).toHaveProperty('colors', colors);
        expect(itemUpdated).toHaveProperty('sizes', sizes);
        expect(itemUpdated).toHaveProperty('amount', Number(amount));
    });
    
    then(/^Eu devo ter um item id "(.*)"$/, async (id) => {
        const item = await prismaTestClient.item.findFirst({
        where: {
            id: Number(id),
        }
        });
    
        expect(item).toHaveProperty('id', Number(id));
    });
    
    and(/^Eu devo ter este item com preço (.+)$/, async (price) => {
        const item = await prismaTestClient.item.findFirst({
        where: {
            price: Number(price),
        }
        });
    
        expect(item).toHaveProperty('price', Number(price));
    });
        
 });
 

test('Remover Item', ({ given, when, then }) => {
    given(/^Eu tenho um item com id "(.*)"$/, async (id) => {
        const item = await prismaTestClient.item.findFirst({
        where: {
            id: Number(id),
        }
        });
    
        expect(item).toHaveProperty('id', Number(id));
    });
    
    when(/^Eu removo o item com id "(.*)"$/, async (id) => {
        const itemDeleted = await prismaTestClient.item.delete({
        where: { id: Number(id) }
        });
    
        expect(itemDeleted).toHaveProperty('id', Number(id));
    });
    
    then(/^Eu não devo ter um item com id "(.*)"$/, async (id) => {
        const item = await prismaTestClient.item.findFirst({
        where: {
            id: Number(id),
        }
        });
    
        expect(item).toBe(null);
    });
});
test('Listar Itens', ({ given, when, then }) => {
    given(/^Eu tenho um item com nome "(.*)"$/, async (name) => {
        const item = await prismaTestClient.item.findFirst({
        where: {
            name,
        }
        });
    
        expect(item).toHaveProperty('name', name);
    });
    
    when(/^Eu listo os itens$/, async () => {
        const items = await prismaTestClient.item.findMany();
    
        expect(items).toHaveLength(1);
    });
    
    then(/^Eu devo ter uma lista com um item com nome "(.*)"$/, async (name) => {
        const items = await prismaTestClient.item.findMany();
    
        expect(items[0]).toHaveProperty('name', name);
    });
});
test('Tentar criar item com campos obrigatórios faltando', ({ given, when, then }) => {
    given(/^Eu não tenho nenhum item com nome "(.*)"$/, async (name) => {
        const itemExists = await prismaTestClient.item.findFirst({
        where: {
            name
        }
        });
    
        expect(itemExists).toBe(null);
    });
    
    when(/^Eu insiro um item com: nome "(.*)", categoria "(.*)", descrição "(.*)", imagem "(.*)", cores "(.*)", tamanhos "(.*)", quantidade (.+)$/, async (
        name, category, description, image, colors, sizes, amount
    ) => {
        try {
        await prismaTestClient.item.create({
            data: {
            name,
            category,
            description,
            image,
            colors,
            sizes,
            amount: Number(amount)
            }
        })
        } catch (error) {
        expect(error).toHaveProperty('code', 'P2013');
        }
    });
    
    then(/^Eu devo ter uma mensagem de erro "(.*)"$/, async (message) => {
        expect(message).toBe('Missing required fields');
    });
});
    
});