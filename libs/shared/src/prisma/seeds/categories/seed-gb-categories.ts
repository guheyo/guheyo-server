import { PrismaClient } from '@prisma/client';

const GB = 'gb';

export async function seedGbCategories(prisma: PrismaClient) {
  let categories = await prisma.category.findMany({
    where: {
      type: GB,
    },
  });

  if (categories.length === 0) {
    await prisma.category.createMany({
      data: [
        {
          type: GB,
          name: '공제',
          slug: 'group-buy',
          position: 0,
        },
        {
          type: GB,
          name: '래플',
          slug: 'raffle',
          position: 1,
        },
        {
          type: GB,
          name: '드랍',
          slug: 'drop',
          position: 2,
        },
        {
          type: GB,
          name: '수익 공구',
          slug: 'profit',
          position: 3,
        },
        {
          type: GB,
          name: '비수익 공구',
          slug: 'non-profit',
          position: 4,
        },
      ],
    });
    categories = await prisma.category.findMany({
      where: {
        type: GB,
      },
    });
  }

  const groups = await prisma.group.findMany();
  await Promise.all(
    categories.map(async (category) => {
      await prisma.category.update({
        where: { id: category.id },
        data: {
          groups: {
            connect: groups.map((group) => ({ id: group.id })),
          },
        },
      });
    }),
  );

  // eslint-disable-next-line no-console
  console.log(categories);
}
