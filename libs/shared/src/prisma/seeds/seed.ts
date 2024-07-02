import { PrismaClient } from '@prisma/client';
import { seedKeyboard } from './groups/seed-keyboard';
import { seedMouse } from './groups/seed-mouse';
import { seedAudio } from './groups/seed-audio';
import { seedRoot } from './groups/seed-root';
import { seedTags } from './tags/seed-tags';
import { seedEmojis } from './emojis/seed-emojis';
import { seedCommunityCategories } from './categories/seed-community-categories';

const prisma = new PrismaClient();

async function main() {
  await seedRoot(prisma);
  await seedKeyboard(prisma);
  await seedMouse(prisma);
  await seedAudio(prisma);
  await seedTags(prisma);
  await seedEmojis(prisma);
  await seedCommunityCategories(prisma);
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
