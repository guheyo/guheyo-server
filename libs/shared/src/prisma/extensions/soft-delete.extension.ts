import { Prisma } from '@prisma/client';

export const softDelete = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      delete<M, A>(
        this: M,
        args: Prisma.Args<M, 'delete'>,
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);
        return (context as any).update({
          where: args.where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    },
  },
});

export const filterSoftDeleted = Prisma.defineExtension({
  name: 'filterSoftDeleted',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (operation === 'findUnique' || operation === 'findFirst' || operation === 'findMany') {
          if (args.where?.deletedAt) return query(args);
          if (args.where?.OR?.filter((input) => input.deletedAt)) return query(args);

          args.where = { ...args.where, deletedAt: null };
          return query(args);
        }
        return query(args);
      },
    },
  },
});
