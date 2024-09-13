import { PrismaClient } from '@prisma/client';
import { filterSoftDeleted, softDelete } from './soft-delete.extension';
import { createSlug } from './slug.extension';
import { calculateTotalPrice } from './calculate-total-price.extension';
import { countOffer } from './count-deal';

export const prismaExtensionFactory = (client: PrismaClient) =>
  client
    .$extends(softDelete)
    .$extends(filterSoftDeleted)
    .$extends(createSlug)
    .$extends(calculateTotalPrice)
    .$extends(countOffer(client));

export type ExtendedPrismaService = ReturnType<typeof prismaExtensionFactory>;
