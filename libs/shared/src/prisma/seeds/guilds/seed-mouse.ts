import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

const GUILD_NAME = '마우스';
const CATEGORY_MOUSE_NAME = '마우스';

const GUILD_SLUG = 'mouse';
const CATEGORY_MOUSE_SLUG = 'mouse';

const GUILD_MOUSE_ID = uuid5(GUILD_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedMouse(prisma: PrismaClient) {
  const guild = await prisma.guild.upsert({
    where: {
      name: GUILD_NAME,
    },
    update: {
      id: GUILD_MOUSE_ID,
      slug: GUILD_SLUG,
      position: 2,
    },
    create: {
      id: GUILD_MOUSE_ID,
      name: GUILD_NAME,
      slug: GUILD_SLUG,
      position: 2,
      productCategories: {
        create: [
          {
            name: CATEGORY_MOUSE_NAME,
            slug: CATEGORY_MOUSE_SLUG,
            position: 0,
          },
        ],
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(guild);
}
