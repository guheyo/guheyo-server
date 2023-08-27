import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const guild = await prisma.guild.upsert({
    where: {
      name: '키보드',
    },
    update: {},
    create: {
      name: '키보드',
      rank: 0,
      market: {
        create: {
          name: '장터',
          productCategories: {
            create: [
              {
                id: '7f54bdc5-0fe3-4a80-88b4-e3875a821a7f',
                name: '커스텀',
                rank: 0,
              },
              {
                id: '68f4937c-64d6-4cd2-9cb1-220f06448608',
                name: '기성품',
                rank: 1,
              },
              {
                id: '9ec7c65f-efb3-48a8-be76-47d41ea09280',
                name: '키캡',
                rank: 2,
              },
              {
                id: 'ff273177-65cb-41c7-8417-9819582abf24',
                name: '아티산',
                rank: 3,
              },
              {
                id: '6464eae0-e4d3-4425-b817-42641436ab5f',
                name: '기타',
                rank: 4,
              },
            ],
          },
        },
      },
      community: {
        create: {
          name: '커뮤니티',
          postCategories: {
            create: [
              {
                id: '8cb545b1-2f69-4164-bc44-e912d1841e34',
                name: '사진 영상',
                rank: 0,
              },
              {
                id: '66fe89c1-c368-4f8d-a757-ecad10dace77',
                name: '정보 후기',
                rank: 1,
              },
              {
                id: '7b82c410-7849-4b95-a14c-5bb213a15b3a',
                name: '거래 후기',
                rank: 2,
              },
            ],
          },
        },
      },
    },
  });
  // eslint-disable-next-line no-console
  console.log(guild);
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
