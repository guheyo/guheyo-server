import { PrismaClient } from '@prisma/client';

const LIKE = 'like';
const LOVE = 'love';
const SAD = 'sad';
const ANGRY = 'angry';

export async function seedEmojis(prisma: PrismaClient) {
  // Define the emojis to be seeded
  const emojis = [LIKE, LOVE, SAD, ANGRY];

  // Iterate over each emoji
  emojis.forEach(async (emoji) => {
    // Check if the emoji already exists in the database
    const existingEmoji = await prisma.emoji.findFirst({
      where: { name: emoji },
    });

    // If the emoji does not exist, create it
    if (!existingEmoji) {
      await prisma.emoji.create({
        data: { name: emoji },
      });
      console.log(`Emoji ${emoji} seeded successfully.`);
    } else {
      console.log(`Emoji ${emoji} already exists.`);
    }
  });
}
