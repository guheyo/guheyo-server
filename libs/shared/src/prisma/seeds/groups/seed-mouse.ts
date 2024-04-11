import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';
import { PRODUCT_CATEGORY_TYPE } from './seed-audio';

const GROUP_NAME = '마우스';
const CATEGORY_MOUSE_NAME = '마우스';

const GROUP_SLUG = 'mouse';
const CATEGORY_MOUSE_SLUG = 'mouse';

const GROUP_MOUSE_ID = uuid5(GROUP_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedMouse(prisma: PrismaClient) {
  const group = await prisma.group.upsert({
    where: {
      name: GROUP_NAME,
    },
    update: {
      id: GROUP_MOUSE_ID,
      slug: GROUP_SLUG,
      position: 2,
    },
    create: {
      id: GROUP_MOUSE_ID,
      name: GROUP_NAME,
      slug: GROUP_SLUG,
      position: 2,
      categories: {
        create: [
          {
            type: PRODUCT_CATEGORY_TYPE,
            name: CATEGORY_MOUSE_NAME,
            slug: CATEGORY_MOUSE_SLUG,
            position: 0,
          },
        ],
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(group);
}
