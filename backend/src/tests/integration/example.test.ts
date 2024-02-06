import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const feature = loadFeature('../backend/src/tests/features/example.feature');

defineFeature(feature, test => {
  
  test('Cenário de exemplo', ({ given, when, then, and }) => {
    const prismaTestClient = new PrismaClient();
    
    given(/^I don't have any user with email "(.*)"$/, async (email) => {
      await database.connect();
      const userExists = await prismaTestClient.user.findFirst({
        where: {
          email
        }
      });

      expect(userExists).toBe(null);
    });
    
    when(/^I insert a user with: name "(.*)", email "(.*)", cpf "(.*)", password "(.*)", phone "(.*)"$/, async (
      name, email, cpf, password, phone
    ) => {
      const newUser = await prismaTestClient.user.create({
        data: {
          name,
          email,
          cpf,
          password,
          phone
        }
      })

      expect(newUser).toHaveProperty('name', name);
      expect(newUser).toHaveProperty('email', email);
      expect(newUser).toHaveProperty('cpf', cpf);
      expect(newUser).toHaveProperty('password', password);
      expect(newUser).toHaveProperty('phone', phone);
    });

    then(/^I should have a user with email "(.*)"$/, async (email) => {
      const user = await prismaTestClient.user.findFirst({
        where: {
          email,
        }
      });

      expect(user).toHaveProperty('email', email);
    });

    and(/^I should have this user with id "(.*)"$/, async (id) => {
      const user = await prismaTestClient.user.findFirst({
        where: {
          id: Number(id),
        }
      });

      expect(user).toHaveProperty('id', Number(id));

      await database.clearValues();
      await database.disconnect();
    });

  });

});