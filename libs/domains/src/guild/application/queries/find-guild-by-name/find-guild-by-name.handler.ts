import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindGuildByNameQuery } from './find-guild-by-name.query';
import { GuildResponse } from '../../dtos/guild.response';

@QueryHandler(FindGuildByNameQuery)
export class FindGuildByNameHandler extends PrismaQueryHandler<
  FindGuildByNameQuery,
  GuildResponse
> {
  constructor() {
    super(GuildResponse);
  }

  async execute(query: FindGuildByNameQuery): Promise<GuildResponse | null> {
    const guild = await this.prismaService.guild.findUnique({
      where: { name: query.name },
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
}
