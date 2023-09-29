import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

const prisma = new PrismaClient();

const GUILD_KEYBOARD_ID = uuid5(
  process.env.DISCORD_GUILD_KEYBOARD_ID!,
  process.env.NAMESPACE_DISCORD!,
);
const PRODUCT_CATEGORY_CUSTOM_ID = uuid5(
  process.env.DISCORD_CATEGORY_CUSTOM_ID!,
  process.env.NAMESPACE_GUILD!,
);
const PRODUCT_CATEGORY_NORMAL_KEYBOARD_ID = uuid5(
  process.env.DISCORD_CATEGORY_NORMAL_KEYBOARD_ID!,
  process.env.NAMESPACE_GUILD!,
);
const PRODUCT_CATEGORY_KEYCAP_ID = uuid5(
  process.env.DISCORD_CATEGORY_KEYCAP_ID!,
  process.env.NAMESPACE_GUILD!,
);
const PRODUCT_CATEGORY_ARTISAN_ID = uuid5(
  process.env.DISCORD_CATEGORY_ARTISAN_ID!,
  process.env.NAMESPACE_GUILD!,
);
const PRODUCT_CATEGORY_ETC_ID = uuid5(
  process.env.DISCORD_CATEGORY_ETC_ID!,
  process.env.NAMESPACE_GUILD!,
);
const POST_CATEGORY_PIC_VID_ID = uuid5(
  process.env.DISCORD_CHANNEL_PIC_VID_ID!,
  process.env.NAMESPACE_GUILD!,
);
const POST_CATEGORY_INFO_REVIEW_ID = uuid5(
  process.env.DISCORD_CHANNEL_INFO_REVIEW_ID!,
  process.env.NAMESPACE_GUILD!,
);
const POST_CATEGORY_TRADE_REVIEW_ID = uuid5(
  process.env.DISCORD_CHANNEL_TRADE_REVIEW_ID!,
  process.env.NAMESPACE_GUILD!,
);

const KEYBOARD = '키보드';
const CUSTOM = '커스텀';
const NORMAL_KEYBOARD = '기성품';
const KEYCAP = '키캡';
const ARTISAN = '아티산';
const ETC = '기타';
const PIC_VID = '사진 영상';
const INFO_REVIEW = '정보 후기';
const TRADE_REVIEW = '거래 후기';

async function main() {
  const guild = await prisma.guild.upsert({
    where: {
      name: KEYBOARD,
    },
    update: {},
    create: {
      id: GUILD_KEYBOARD_ID,
      name: KEYBOARD,
      position: 0,
      productCategories: {
        create: [
          {
            id: PRODUCT_CATEGORY_CUSTOM_ID,
            name: CUSTOM,
            position: 0,
          },
          {
            id: PRODUCT_CATEGORY_NORMAL_KEYBOARD_ID,
            name: NORMAL_KEYBOARD,
            position: 1,
          },
          {
            id: PRODUCT_CATEGORY_KEYCAP_ID,
            name: KEYCAP,
            position: 2,
          },
          {
            id: PRODUCT_CATEGORY_ARTISAN_ID,
            name: ARTISAN,
            position: 3,
          },
          {
            id: PRODUCT_CATEGORY_ETC_ID,
            name: ETC,
            position: 4,
          },
        ],
      },
      postCategories: {
        create: [
          {
            id: POST_CATEGORY_PIC_VID_ID,
            name: PIC_VID,
            position: 0,
          },
          {
            id: POST_CATEGORY_INFO_REVIEW_ID,
            name: INFO_REVIEW,
            position: 1,
          },
          {
            id: POST_CATEGORY_TRADE_REVIEW_ID,
            name: TRADE_REVIEW,
            position: 2,
          },
        ],
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(guild);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
