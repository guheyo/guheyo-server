import { prisma } from '../loaders';

const keywordService = {
  async getKeyword({ id }: { id: string }) {
    const keyword = await prisma.keyword.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    return keyword;
  },
  // async createKeyword({
  //   name
  // }: {
  //   name: string
  // }) {
  //   const keyword = await prisma.keyword.upsert({
  //     where: {
  //       name: name
  //     },
  //     update: {
  //       users: {
  //         connect: {
  //           id: user.id
  //         }
  //       }
  //     },
  //     create: {
  //       name: name,
  //       users: {
  //         connect: {
  //           id: user.id
  //         }
  //       }
  //     }
  //   });
  //   return keyword;
  // }
};

export default keywordService;
