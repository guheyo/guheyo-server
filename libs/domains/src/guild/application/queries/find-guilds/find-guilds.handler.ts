import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindGuildsQuery } from './find-guilds.query';
import { GuildResponse } from '../../dtos/guild.response';
import { PaginatedGuildsResponse } from './paginated-guilds.response';

@QueryHandler(FindGuildsQuery)
export class FindGuildsHandler extends PrismaQueryHandler<FindGuildsQuery, GuildResponse> {
  constructor() {
    super(GuildResponse);
  }

  async execute(query: FindGuildsQuery): Promise<PaginatedGuildsResponse> {
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
    return paginate<GuildResponse>(this.parseResponses(guilds), 'id', query.take);
  }
}
