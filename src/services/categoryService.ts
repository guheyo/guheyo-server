import { prisma } from '../loaders';
import _ from 'lodash';

const categoryService = {
  async getCategories({
    guildId,
  }: {
    guildId: string
  }) {
    const categories = await prisma.category.findMany({
      where: {
        guildId: guildId,
      },
      orderBy: {
        rank: 'asc'
      }
    });
    return categories;
  }
}

export default categoryService;