import { PrismaClient } from '@prisma/client';

const GB = 'gb';

export async function seedGbCategories(prisma: PrismaClient) {
  const categoriesData = [
    {
      type: GB,
      name: '수익 공구',
      slug: 'profit',
      position: 0,
    },
    {
      type: GB,
      name: '비수익 공구',
      slug: 'non-profit',
      position: 1,
    },
    {
      type: GB,
      name: '수요조사',
      slug: 'ic',
      position: 2,
    },
    {
      type: GB,
      name: '공제',
      slug: 'group-buy',
      position: 3,
    },
    {
      type: GB,
      name: '래플',
      slug: 'raffle',
      position: 4,
    },
  ];

  const upsertCategories = await Promise.all(
    categoriesData.map(async (category) => {
      const existingCategory = await prisma.category.findFirst({
        where: { name: category.name },
      });

      if (existingCategory) {
        return prisma.category.update({
          where: { id: existingCategory.id },
          data: {
            name: category.name,
            slug: category.slug,
            position: category.position,
          },
        });
      }
      return prisma.category.create({
        data: {
          type: category.type,
          name: category.name,
          slug: category.slug,
          position: category.position,
        },
      });
    }),
  );

  const groups = await prisma.group.findMany();

  // Connect categories to groups after ensuring their existence
  await Promise.all(
    upsertCategories.map(async (category) => {
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
  console.log('Upserted GB Categories:', upsertCategories);
}
