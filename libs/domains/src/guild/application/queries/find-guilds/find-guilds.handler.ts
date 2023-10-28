import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindGuildsQuery } from './find-guilds.query';
import { GuildResponse } from '../../dtos/guild.response';

@QueryHandler(FindGuildsQuery)
export class FindGuildsHandler extends PrismaQueryHandler<FindGuildsQuery, GuildResponse> {
  constructor() {
    super(GuildResponse);
  }

  async execute(query: FindGuildsQuery): Promise<GuildResponse[]> {
    const guilds = await this.prismaService.guild.findMany({
      orderBy: {
        position: 'asc',
      },
      include: {
        productCategories: {
          orderBy: {
            position: 'asc',
          },
        },
        postCategories: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
    return this.parseResponses(guilds);
  }
}
