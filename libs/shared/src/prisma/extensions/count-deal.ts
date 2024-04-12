import { FindOfferCountArgs } from '@lib/domains/offer/application/queries/find-offer-count/find-offer-count.args';
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
                  userId: args.userId,
                },
                {
                  bumpedAt: {
                    gt: dayjs().subtract(args.fromHours, 'hours').toDate(),
                  },
                },
                {
                  businessFunction: args.businessFunction,
                },
                {
                  post: {
                    categoryId: args.categoryId,
                  },
                },
              ],
            },
          });
          return count;
        },
      },
    },
  });
