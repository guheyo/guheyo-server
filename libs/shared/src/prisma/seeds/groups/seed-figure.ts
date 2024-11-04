import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

export const PRODUCT_CATEGORY_TYPE = 'product';

const GROUP_NAME = '피규어';
const GROUP_SLUG = 'figure';

const GROUP_FIGURE_ID = uuid5(GROUP_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedFigure(prisma: PrismaClient) {
  const categoriesData = [
    {
      type: PRODUCT_CATEGORY_TYPE,
      name: '스케일',
      slug: 'scale',
      position: 0,
    },
    {
      type: PRODUCT_CATEGORY_TYPE,
      name: '경품',
      slug: 'prize',
      position: 1,
    },
    {
      type: PRODUCT_CATEGORY_TYPE,
      name: '넨도로이드',
      slug: 'nendoroid',
      position: 2,
    },
    {
      type: PRODUCT_CATEGORY_TYPE,
      name: '건프라',
      slug: 'gunpla',
      position: 3,
    },
    {
      type: PRODUCT_CATEGORY_TYPE,
      name: '아트토이',
      slug: 'art-toy',
      position: 4,
    },
  ];

  const group = await prisma.group.upsert({
    where: {
      name: GROUP_NAME,
    },
    update: {
      id: GROUP_FIGURE_ID,
      slug: GROUP_SLUG,
      position: 4,
    },
    create: {
      id: GROUP_FIGURE_ID,
      name: GROUP_NAME,
      slug: GROUP_SLUG,
      position: 4,
      categories: {
        create: categoriesData,
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(group);
}
