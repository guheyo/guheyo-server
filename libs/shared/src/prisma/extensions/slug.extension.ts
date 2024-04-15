import slugify from '@lib/shared/slugify/slugify';
import { Prisma } from '@prisma/client';

export const createSlug = Prisma.defineExtension({
  name: 'createSlug',
  query: {
    $allModels: {
      create({ model, operation, args, query }) {
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
