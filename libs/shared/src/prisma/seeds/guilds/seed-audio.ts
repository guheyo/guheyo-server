import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

const GUILD_NAME = '음향기기';
const CATEGORY_AUDIO_NAME = '음향기기';

const GUILD_SLUG = 'audio';
const CATEGORY_AUDIO_SLUG = 'audio';

const GUILD_AUDIO_ID = uuid5(GUILD_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedAudio(prisma: PrismaClient) {
  const guild = await prisma.guild.upsert({
    where: {
      name: GUILD_NAME,
    },
    update: {
      id: GUILD_AUDIO_ID,
      slug: GUILD_SLUG,
      position: 3,
    },
    create: {
      id: GUILD_AUDIO_ID,
      name: GUILD_NAME,
      slug: GUILD_SLUG,
      position: 3,
      productCategories: {
        create: [
          {
            name: CATEGORY_AUDIO_NAME,
            slug: CATEGORY_AUDIO_SLUG,
            position: 0,
          },
        ],
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(guild);
}
