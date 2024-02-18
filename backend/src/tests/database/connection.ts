import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

class DatabaseTestConnection {
  private prismaTestClient: PrismaClient;
  
  constructor() {
    this.prismaTestClient = new PrismaClient();
  }

  async connect() {
    await this.prismaTestClient.$connect();
  }
  
  async clearValues() {
    const modelNames = Object.keys(this.prismaTestClient).map((key) => {
      if (key.startsWith('$') || key.startsWith('_')) {
        return;
      }
      return key;
    }).filter((key) => key !== undefined);

    try {
      for (const model of modelNames) {
        await this.prismaTestClient.$executeRawUnsafe(`DELETE FROM "${model}";`);
      }
      await this.prismaTestClient.$executeRawUnsafe(`DELETE FROM sqlite_sequence;`);
    } catch (error) {
      console.error(`Error clearing values: ${error}`);
    }
  }

  async disconnect() {
    await this.prismaTestClient.$disconnect();
  }
}
  
export default new DatabaseTestConnection();