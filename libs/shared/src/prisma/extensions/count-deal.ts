import { FindDemandCountArgs } from '@lib/domains/demand/application/queries/find-demand-count/find-demand-count.args';
import { FindOfferCountArgs } from '@lib/domains/offer/application/queries/find-offer-count/find-offer-count.args';
import { FindSwapCountArgs } from '@lib/domains/swap/application/queries/find-swap-count/find-swap-count.args';
import { Prisma, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

export const countOffer = (prisma: PrismaClient) =>
  Prisma.defineExtension({
    name: 'countOffer',
    model: {
      offer: {
        async countOffer(args: FindOfferCountArgs) {
          const count = await prisma.offer.count({
            where: {
              AND: [
                {
                  sellerId: args.sellerId,
                },
                {
                  bumpedAt: {
                    gt: dayjs().subtract(args.fromHours, 'hours').toDate(),
                  },
                },
                {
                  productCategoryId: args.productCategoryId,
                },
              ],
            },
          });
          return count;
        },
      },
    },
  });

export const countDemand = (prisma: PrismaClient) =>
  Prisma.defineExtension({
    name: 'countDemand',
    model: {
      demand: {
        async countDemand(args: FindDemandCountArgs) {
          const count = await prisma.demand.count({
            where: {
              AND: [
                {
                  buyerId: args.buyerId,
                },
                {
                  bumpedAt: {
                    gt: dayjs().subtract(args.fromHours, 'hours').toDate(),
                  },
                },
                {
                  productCategoryId: args.productCategoryId,
                },
              ],
            },
          });
          return count;
        },
      },
    },
  });

export const countSwap = (prisma: PrismaClient) =>
  Prisma.defineExtension({
    name: 'countSwap',
    model: {
      swap: {
        async countSwap(args: FindSwapCountArgs) {
          const count = await prisma.swap.count({
            where: {
              AND: [
                {
                  proposerId: args.proposerId,
                },
                {
                  bumpedAt: {
                    gt: dayjs().subtract(args.fromHours, 'hours').toDate(),
                  },
                },
                {
                  productCategoryId: args.productCategoryId,
                },
              ],
            },
          });
          return count;
        },
      },
    },
  });
