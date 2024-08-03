import { PrismaClient } from '@prisma/client';

const COMMUNITY = 'community';

export async function seedCommunityCategories(prisma: PrismaClient) {
  let categories = await prisma.category.findMany({
    where: {
      type: COMMUNITY,
    },
  });

  if (categories.length === 0) {
    await prisma.category.createMany({
      data: [
        {
          type: COMMUNITY,
          name: '질문',
          slug: 'suggestion',
          position: 0,
        },
        {
          type: COMMUNITY,
          name: '갤러리',
          slug: 'gallery',
          position: 1,
        },
        {
          type: COMMUNITY,
          name: '정보',
          slug: 'info',
          position: 2,
        },
        {
          type: COMMUNITY,
          name: '모임',
          slug: 'meetup',
          position: 3,
        },
      ],
    });
    categories = await prisma.category.findMany({
      where: {
        type: COMMUNITY,
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
