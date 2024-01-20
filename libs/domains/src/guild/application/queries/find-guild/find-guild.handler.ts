import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindGuildQuery } from './find-guild.query';
import { GuildResponse } from '../../dtos/guild.response';

@QueryHandler(FindGuildQuery)
export class FindGuildHandler extends PrismaQueryHandler<FindGuildQuery, GuildResponse> {
  constructor() {
    super(GuildResponse);
  }

  async execute(query: FindGuildQuery): Promise<GuildResponse | null> {
    let guild: GuildResponse | null;
    if (query.slug) {
      guild = await this.prismaService.guild.findFirst({
        where: { slug: query.slug },
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
          roles: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      });
      return this.parseResponse(guild);
    }
    return null;
  }
}
