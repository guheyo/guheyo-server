import { PrismaClient } from '@prisma/client';
import { seedKeyboard } from './guilds/seed-keyboard';
import { seedMouse } from './guilds/seed-mouse';
import { seedAudio } from './guilds/seed-audio';

const prisma = new PrismaClient();

async function main() {
  await seedKeyboard(prisma);
  await seedMouse(prisma);
  await seedAudio(prisma);
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
