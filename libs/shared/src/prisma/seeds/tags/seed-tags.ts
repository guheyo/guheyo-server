import { PrismaClient } from '@prisma/client';

const MANNER_TAG = 'manner';
const BAD_MANNER_TAG = 'badManner';

export async function seedTags(prisma: PrismaClient) {
  const tags = await prisma.tag.createMany({
    data: [
      {
        type: MANNER_TAG,
        name: '친절한 매너',
        position: 0,
      },
      {
        type: MANNER_TAG,
        name: '빠른 응답',
        position: 1,
      },
      {
        type: MANNER_TAG,
        name: '빠른 배송',
        position: 2,
      },
      {
        type: MANNER_TAG,
        name: '설명 일치',
        position: 3,
      },
      {
        type: MANNER_TAG,
        name: '꿀매',
        position: 4,
      },
      {
        type: MANNER_TAG,
        name: '쿨거래',
        position: 5,
      },
      {
        type: BAD_MANNER_TAG,
        name: '비매너',
        position: 6,
      },
    ],
  });

  // eslint-disable-next-line no-console
  console.log(tags);
}
