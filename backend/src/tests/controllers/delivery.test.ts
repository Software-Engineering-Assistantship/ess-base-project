import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app'

const feature = loadFeature('../backend/src/tests/features/delivery.feature');
const prismaTestClient = new PrismaClient();
let apiResponse: request.Response;

defineFeature(feature, test => {

    beforeAll(async () => {
      await database.clearValues();
      await database.connect();
    });
})