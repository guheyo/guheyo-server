import { prisma } from '../loaders';

const guildService = {
  async getGuilds() {
    const guilds = await prisma.guild.findMany({
      orderBy: {
        rank: 'asc',
      },
    });
    return guilds;
  },
  async getGuildCategories(name: string) {
    const guild = await prisma.guild.findUnique({
      where: {
        name,
      },
      include: {
        categories: {
          orderBy: {
            rank: 'asc',
          },
        },
      },
    });
    if (!guild) return [];
    return guild.categories;
  },
};

export default guildService;
