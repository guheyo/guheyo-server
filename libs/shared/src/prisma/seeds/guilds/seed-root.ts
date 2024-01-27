import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

const GUILD_NAME = 'root';

const GUILD_SLUG = 'root';

const GUILD_ROOT_ID = uuid5(GUILD_NAME, process.env.NAMESPACE_DISCORD!);

export async function seedRoot(prisma: PrismaClient) {
  const guild = await prisma.guild.upsert({
    where: {
      name: GUILD_NAME,
    },
    update: {
      id: GUILD_ROOT_ID,
      slug: GUILD_SLUG,
      position: 0,
    },
    create: {
      id: GUILD_ROOT_ID,
      name: GUILD_NAME,
      slug: GUILD_SLUG,
      position: 0,
    },
  });

  // eslint-disable-next-line no-console
  console.log(guild);
}
