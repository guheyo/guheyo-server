import slugify from '@lib/shared/slugify/slugify';
import { Prisma } from '@prisma/client';

export const createSlug = Prisma.defineExtension({
  name: 'createSlug',
  query: {
    $allModels: {
      create({ model, operation, args, query }) {
        if (model === 'Offer' || model === 'Demand' || model === 'Auction') {
          args.data = {
            ...args.data,
            slug: slugify(args.data.name),
          };
        }
        if (model === 'Swap') {
          args.data = {
            ...args.data,
            slug: slugify(`${args.data.name0}-${args.data.name1}`),
          };
        }
        if (model === 'Post') {
          args.data = {
            ...args.data,
            slug: slugify(args.data.title),
          };
        }
        return query(args);
      },
    },
  },
});
