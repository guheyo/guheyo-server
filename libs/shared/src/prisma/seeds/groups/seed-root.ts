import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

const GROUP_NAME = 'root';

const GROUP_SLUG = 'root';

const GROUP_ROOT_ID = uuid5(GROUP_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedRoot(prisma: PrismaClient) {
  const group = await prisma.group.upsert({
    where: {
      name: GROUP_NAME,
    },
    update: {
      id: GROUP_ROOT_ID,
      slug: GROUP_SLUG,
      position: 0,
    },
    create: {
      id: GROUP_ROOT_ID,
      name: GROUP_NAME,
      slug: GROUP_SLUG,
      position: 0,
    },
  });

  // eslint-disable-next-line no-console
  console.log(group);
}
