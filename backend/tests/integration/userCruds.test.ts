import { defineFeature, loadFeature } from 'jest-cucumber';
import database from '../database/connection';
import request from 'supertest';
import { beforeEach } from 'node:test';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';

const feature = loadFeature('../backend/tests/features/tests.feature');

defineFeature(feature, test => {
  
  test('Depositing a paycheck', ({ given, when, then }) => {
    const prismaTestClient = new PrismaClient();
    
    given(/^I don't have any user with email "(.*)"$/, async (email) => {
      await database.connect();
      const userExists = await prismaTestClient.user.findFirst({
        where: {
          email
        }
      });

      console.log('omg user exists: ', { ...userExists });
    });
    
    when(/^I insert a user with: name "(.*)", email "(.*)", cpf "(.*)", password "(.*)", phone "(.*)"$/, async (
      name, email, cpf, password, phone
    ) => {
      await prismaTestClient.user.create({
        data: {
          name,
          email,
          cpf,
          password,
          phone
        }
      })
    });

    then(/^I should have a user with email "(.*)" and id "(.*)"$/, async (email) => {
      const user = await prismaTestClient.user.findFirst({
        where: {
          email,
        }
      });

      console.log({ ...user });
      await database.clearValues();
      await database.disconnect();
    });
  });
});