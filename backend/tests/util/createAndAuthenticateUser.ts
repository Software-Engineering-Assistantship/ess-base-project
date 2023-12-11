import request from 'supertest';
import { Express } from 'express';
import { hash } from 'bcryptjs';
import prisma from '../../src/database';

export async function createAndAuthenticateUser(app: Express) {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    },
  });

  const tokenResponse = await request(app).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  });

  const { id } = user;

  const { accessToken: token } = tokenResponse.body.data;

  return { token, id };
}
