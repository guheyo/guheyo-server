import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@lib/shared';
import { FindGuildByIdQuery } from './find-guild-by-id.query';
import { GuildResponse } from '../../dtos/guild.response';

@QueryHandler(FindGuildByIdQuery)
export class FindGuildByIdHandler implements IQueryHandler<FindGuildByIdQuery> {
  constructor(private prismaService: PrismaService) {}

  async execute(query: FindGuildByIdQuery): Promise<GuildResponse | null> {
    const guild = await this.prismaService.guild.findUnique({
      where: { id: query.id },
    });
    return guild ? new GuildResponse(guild) : null;
  }
}
