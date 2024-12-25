import { PrismaClient } from '@prisma/client';

const createPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL as string,
      },
    },
    log: ['query'],
  });
};

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

const globalPrismaClient = globalThis as unknown as {
  prismaClient: PrismaClientSingleton | undefined;
};

export const prismaClient =
  globalPrismaClient.prismaClient ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production')
  globalPrismaClient.prismaClient = prismaClient;
