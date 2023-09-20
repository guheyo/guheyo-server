import { PrismaClient } from '@prisma/client';
import { v5 as uuid5 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const guild = await prisma.guild.upsert({
    where: {
      name: '키보드',
    },
    update: {},
    create: {
      id: uuid5('806383744151584779', process.env.NAMESPACE_DISCORD!),
      name: '키보드',
      rank: 0,
      market: {
        create: {
          name: '장터',
          productCategories: {
            create: [
              {
                id: uuid5('806386907302199296', process.env.NAMESPACE_GUILD!),
                name: '커스텀',
                rank: 0,
              },
              {
                id: uuid5('1061611125055180800', process.env.NAMESPACE_GUILD!),
                name: '기성품',
                rank: 1,
              },
              {
                id: uuid5('806388583060733983', process.env.NAMESPACE_GUILD!),
                name: '키캡',
                rank: 2,
              },
              {
                id: uuid5('806388500986855424', process.env.NAMESPACE_GUILD!),
                name: '아티산',
                rank: 3,
              },
              {
                id: uuid5('806388662564552715', process.env.NAMESPACE_GUILD!),
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
                id: uuid5('1055886716822634568', process.env.NAMESPACE_GUILD!),
                name: '사진 영상',
                rank: 0,
              },
              {
                id: uuid5('1055861667772248126', process.env.NAMESPACE_GUILD!),
                name: '정보 후기',
                rank: 1,
              },
              {
                id: uuid5('1056453218567213076', process.env.NAMESPACE_GUILD!),
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
