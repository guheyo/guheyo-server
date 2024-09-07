import { PrismaClient } from '@prisma/client';

const PLATFORMS = [
  {
    name: 'website',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202409/website/site.png',
  },
  {
    name: 'naver',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202409/naver/btnG_icon_circle.png',
  },
  {
    name: 'discord',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202409/discord/discord-mark-blue.png',
  },
  {
    name: 'instagram',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202409/instagram/Instagram_Glyph_Gradient.png',
  },
];

export async function seedPlatforms(prisma: PrismaClient) {
  const platforms = PLATFORMS.map((platform) =>
    prisma.platform.upsert({
      where: {
        name: platform.name,
      },
      create: {
        name: platform.name,
        description: platform.description,
        logo: platform.logo,
      },
      update: {
        name: platform.name,
        description: platform.description,
        logo: platform.logo,
      },
    }),
  );
  // eslint-disable-next-line no-console
  console.log(await Promise.all(platforms));
}
