import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindGuildByIdQuery } from './find-guild-by-id.query';
import { GuildResponse } from '../../dtos/guild.response';

@QueryHandler(FindGuildByIdQuery)
export class FindGuildByIdHandler extends PrismaQueryHandler<FindGuildByIdQuery, GuildResponse> {
  constructor() {
    super(GuildResponse);
  }

  async execute(query: FindGuildByIdQuery): Promise<GuildResponse | null> {
    const guild = await this.prismaService.guild.findUnique({
      where: { id: query.id },
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
    return this.parseResponse(guild);
  }
}
