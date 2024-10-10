import { PrismaClient } from '@prisma/client';

const COMMUNITY = 'community';

export async function seedCommunityCategories(prisma: PrismaClient) {
  const categoriesData = [
    {
      type: COMMUNITY,
      name: '일반',
      slug: 'general',
      position: 0,
    },
    {
      type: COMMUNITY,
      name: '질문',
      slug: 'question',
      position: 1,
    },
    {
      type: COMMUNITY,
      name: '갤러리',
      slug: 'gallery',
      position: 2,
    },
    {
      type: COMMUNITY,
      name: '정보',
      slug: 'info',
      position: 3,
    },
    {
      type: COMMUNITY,
      name: '모임',
      slug: 'meetup',
      position: 4,
    },
  ];

  // Upsert categories to ensure they exist or get updated if they already do
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
  console.log('Upserted Community Categories:', upsertCategories);
}
