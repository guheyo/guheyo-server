import { PrismaClient } from '@prisma/client';

const COMMUNITY = 'community';

export async function seedCommunityCategories(prisma: PrismaClient) {
  const communityCategories = await prisma.category.findMany({
    where: {
      type: COMMUNITY,
    },
  });

  let categories;
  if (communityCategories.length === 0) {
    categories = await prisma.category.createMany({
      data: [
        {
          type: COMMUNITY,
          name: '추천 요망',
          position: 0,
        },
        {
          type: COMMUNITY,
          name: '사진 영상',
          position: 1,
        },
        {
          type: COMMUNITY,
          name: '정보 후기',
          position: 2,
        },
        {
          type: COMMUNITY,
          name: '모임',
          position: 3,
        },
      ],
    });
  }

  // eslint-disable-next-line no-console
  console.log(categories);
}
