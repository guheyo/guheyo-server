import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';
import { PRODUCT_CATEGORY_TYPE } from './seed-audio';

const GROUP_NAME = '커스텀 키보드';
const CUSTOM_NAME = '커스텀';
const NORMAL_KEYBOARD_NAME = '기성품';
const KEYCAP_NAME = '키캡';
const ARTISAN_NAME = '아티산';
const ETC_NAME = '기타';
const REQUEST_NAME = '공임';

const GROUP_SLUG = 'custom-keyboard';
const CUSTOM_SLUG = 'custom-keyboard';
const NORMAL_KEYBOARD_SLUG = 'mechanical-keyboard';
const KEYCAP_SLUG = 'keycap';
const ARTISAN_SLUG = 'artisan';
const ETC_SLUG = 'etc';
const REQUEST_SLUG = 'request';

const GROUP_KEYBOARD_ID = uuid5(GROUP_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedKeyboard(prisma: PrismaClient) {
  const group = await prisma.group.upsert({
    where: {
      name: GROUP_NAME,
    },
    update: {
      id: GROUP_KEYBOARD_ID,
      slug: GROUP_SLUG,
      position: 1,
    },
    create: {
      id: GROUP_KEYBOARD_ID,
      name: GROUP_NAME,
      slug: GROUP_SLUG,
      position: 1,
      categories: {
        create: [
          {
            type: PRODUCT_CATEGORY_TYPE,
            name: CUSTOM_NAME,
            slug: CUSTOM_SLUG,
            position: 0,
          },
          {
            type: PRODUCT_CATEGORY_TYPE,
            name: NORMAL_KEYBOARD_NAME,
            slug: NORMAL_KEYBOARD_SLUG,
            position: 1,
          },
          {
            type: PRODUCT_CATEGORY_TYPE,
            name: KEYCAP_NAME,
            slug: KEYCAP_SLUG,
            position: 2,
          },
          {
            type: PRODUCT_CATEGORY_TYPE,
            name: ARTISAN_NAME,
            slug: ARTISAN_SLUG,
            position: 3,
          },
          {
            type: PRODUCT_CATEGORY_TYPE,
            name: ETC_NAME,
            slug: ETC_SLUG,
            position: 4,
          },
          {
            type: PRODUCT_CATEGORY_TYPE,
            name: REQUEST_NAME,
            slug: REQUEST_SLUG,
            position: 5,
          },
        ],
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(group);
}
