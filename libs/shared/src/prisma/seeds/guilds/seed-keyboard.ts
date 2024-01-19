import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

const GUILD_NAME = '커스텀 키보드';
const CUSTOM_NAME = '커스텀';
const NORMAL_KEYBOARD_NAME = '기성품';
const KEYCAP_NAME = '키캡';
const ARTISAN_NAME = '아티산';
const ETC_NAME = '기타';
const REQUEST_NAME = '공임';
const PIC_VID_NAME = '사진 영상';
const INFO_REVIEW_NAME = '정보 후기';
const TRADE_REVIEW_NAME = '거래 후기';

const GUILD_SLUG = 'custom-keyboard';
const CUSTOM_SLUG = 'custom-keyboard';
const NORMAL_KEYBOARD_SLUG = 'mechanical-keyboard';
const KEYCAP_SLUG = 'keycap';
const ARTISAN_SLUG = 'artisan';
const ETC_SLUG = 'etc';
const REQUEST_SLUG = 'request';
const PIC_VID_SLUG = 'pic-vid';
const INFO_REVIEW_SLUG = 'info-review';
const TRADE_REVIEW_SLUG = 'trade-review';

const GUILD_KEYBOARD_ID = uuid5(GUILD_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedKeyboard(prisma: PrismaClient) {
  const guild = await prisma.guild.upsert({
    where: {
      name: GUILD_NAME,
    },
    update: {
      id: GUILD_KEYBOARD_ID,
      slug: GUILD_SLUG,
      position: 0,
    },
    create: {
      id: GUILD_KEYBOARD_ID,
      name: GUILD_NAME,
      slug: GUILD_SLUG,
      position: 0,
      productCategories: {
        create: [
          {
            name: CUSTOM_NAME,
            slug: CUSTOM_SLUG,
            position: 0,
          },
          {
            name: NORMAL_KEYBOARD_NAME,
            slug: NORMAL_KEYBOARD_SLUG,
            position: 1,
          },
          {
            name: KEYCAP_NAME,
            slug: KEYCAP_SLUG,
            position: 2,
          },
          {
            name: ARTISAN_NAME,
            slug: ARTISAN_SLUG,
            position: 3,
          },
          {
            name: ETC_NAME,
            slug: ETC_SLUG,
            position: 4,
          },
          {
            name: REQUEST_NAME,
            slug: REQUEST_SLUG,
            position: 5,
          },
        ],
      },
      postCategories: {
        create: [
          {
            name: PIC_VID_NAME,
            slug: PIC_VID_SLUG,
            position: 0,
          },
          {
            name: INFO_REVIEW_NAME,
            slug: INFO_REVIEW_SLUG,
            position: 1,
          },
          {
            name: TRADE_REVIEW_NAME,
            slug: TRADE_REVIEW_SLUG,
            position: 2,
          },
        ],
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(guild);
}
