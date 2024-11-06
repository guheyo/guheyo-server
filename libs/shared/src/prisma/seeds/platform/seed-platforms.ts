import { PrismaClient } from '@prisma/client';

const PLATFORMS = [
  {
    name: '웹사이트',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202409/website/site.png',
    position: 0,
  },
  {
    name: '스마트스토어',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202409/naver/btnG_icon_circle.png',
    position: 1,
  },
  {
    name: '디스코드',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202409/discord/discord-mark-blue.png',
    position: 2,
  },
  {
    name: '인스타그램',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202409/instagram/Instagram_Glyph_Gradient.png',
    position: 3,
  },
  {
    name: 'X',
    description: '',
    logo: 'https://guheyo.s3.ap-northeast-2.amazonaws.com/platform/202411/x/logo-black.png',
    position: 4,
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
        position: platform.position,
      },
      update: {
        name: platform.name,
        description: platform.description,
        logo: platform.logo,
        position: platform.position,
      },
    }),
  );
  // eslint-disable-next-line no-console
  console.log(await Promise.all(platforms));
}
