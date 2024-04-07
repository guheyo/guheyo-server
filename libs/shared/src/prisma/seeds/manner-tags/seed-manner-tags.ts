import { PrismaClient } from '@prisma/client';

export async function seedManerTags(prisma: PrismaClient) {
  const mannerTags = await prisma.mannerTag.createMany({
    data: [
      {
        name: '친절한 매너',
        isPositive: true,
        position: 0,
      },
      {
        name: '빠른 응답',
        isPositive: true,
        position: 1,
      },
      {
        name: '빠른 배송',
        isPositive: true,
        position: 2,
      },
      {
        name: '설명 일치',
        isPositive: true,
        position: 3,
      },
      {
        name: '꿀매',
        isPositive: true,
        position: 4,
      },
      {
        name: '쿨거래',
        isPositive: true,
        position: 5,
      },
      {
        name: '비매너',
        isPositive: false,
        position: 6,
      },
    ],
  });

  // eslint-disable-next-line no-console
  console.log(mannerTags);
}
