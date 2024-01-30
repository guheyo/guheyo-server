import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

const GROUP_NAME = '음향기기';
const CATEGORY_AUDIO_NAME = '음향기기';

const GROUP_SLUG = 'audio';
const CATEGORY_AUDIO_SLUG = 'audio';

const GROUP_AUDIO_ID = uuid5(GROUP_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedAudio(prisma: PrismaClient) {
  const group = await prisma.group.upsert({
    where: {
      name: GROUP_NAME,
    },
    update: {
      id: GROUP_AUDIO_ID,
      slug: GROUP_SLUG,
      position: 3,
    },
    create: {
      id: GROUP_AUDIO_ID,
      name: GROUP_NAME,
      slug: GROUP_SLUG,
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
  console.log(group);
}
