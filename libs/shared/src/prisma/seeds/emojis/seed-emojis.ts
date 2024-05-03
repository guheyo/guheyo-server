import { PrismaClient } from '@prisma/client';

const LOVE = 'love';
const LIKE = 'like';
const HMM = 'hmm';
const SAD = 'sad';
const ANGRY = 'angry';

export async function seedEmojis(prisma: PrismaClient) {
  // Define the emojis to be seeded
  const emojis = [LOVE, LIKE, HMM, SAD, ANGRY];

  // Iterate over each emoji
  emojis.forEach(async (emoji, index) => {
    // Check if the emoji already exists in the database
    const existingEmoji = await prisma.emoji.findFirst({
      where: { name: emoji },
    });

    // If the emoji does not exist, create it
    if (!existingEmoji) {
      await prisma.emoji.create({
        data: {
          name: emoji,
          position: index,
        },
      });
      console.log(`Emoji ${emoji} seeded successfully.`);
    } else {
      console.log(`Emoji ${emoji} already exists.`);
    }
  });
}
