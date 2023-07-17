import { prisma } from '../loaders';

const categoryService = {
  async getCategories({ guildId }: { guildId: string }) {
    const categories = await prisma.category.findMany({
      where: {
        guildId,
      },
      orderBy: {
        rank: 'asc',
      },
    });
    return categories;
  },
};

export default categoryService;
