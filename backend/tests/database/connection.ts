import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import fs from 'fs';

class DatabaseTestConnection {
  private prismaTestClient: PrismaClient;
  
  constructor() {
    this.prismaTestClient = new PrismaClient();
  }
  
  async connect() {
    await this.prismaTestClient.$connect();
  }
  
  async connectSeed() {
    await this.prismaTestClient.$connect();
    return this.prismaTestClient;
  }
  
  async clearValues() {
    const filePath = '../backend/prisma/dev-test.db';
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error(`Error removing file ${filePath}: ${error}`);
    }
  }

  async disconnect() {
    await this.prismaTestClient.$disconnect();
  }
}
  
export default new DatabaseTestConnection();