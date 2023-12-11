import { PrismaClient } from '@prisma/client';

class DatabaseConnection {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(): Promise<void> {
    try {
      await this.prisma.$connect();
    } catch (error) {
      throw new Error(`Error: could not connect to test database! Make sure you are running the back-end with the "docker-compose up" command. ${error}`);
    }
  }

  async close() {
    await this.prisma.$disconnect();
  }

  async clear() {
    const tables = await this.prisma.$queryRaw`
      SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename NOT LIKE '_prisma_%';
    ` as { tablename: string }[];

    await Promise.all(
      tables.map(async (table) => {
        await this.prisma.$executeRawUnsafe(`DELETE FROM "${table.tablename}"`);
      }),
    );
  }

  async get() {
    return this.prisma;
  }
}

export { DatabaseConnection };
