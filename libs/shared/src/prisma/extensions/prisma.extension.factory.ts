import { PrismaClient } from '@prisma/client';
import { filterSoftDeleted, hardDelete, softDelete } from './soft-delete.extension';
import { createSlug } from './slug.extension';

export const prismaExtensionFactory = (client: PrismaClient) =>
  client.$extends(softDelete).$extends(hardDelete).$extends(filterSoftDeleted).$extends(createSlug);

export type ExtendedPrismaService = ReturnType<typeof prismaExtensionFactory>;
