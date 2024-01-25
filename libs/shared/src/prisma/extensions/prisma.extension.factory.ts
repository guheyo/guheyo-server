import { PrismaClient } from '@prisma/client';
import { filterSoftDeleted, hardDelete, softDelete } from './soft-delete.extension';

export const prismaExtensionFactory = (client: PrismaClient) =>
  client.$extends(softDelete).$extends(hardDelete).$extends(filterSoftDeleted);

export type ExtendedPrismaService = ReturnType<typeof prismaExtensionFactory>;
