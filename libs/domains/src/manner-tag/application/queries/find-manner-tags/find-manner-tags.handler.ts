import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindMannerTagsQuery } from './find-manner-tags.query';
import { MannerTagResponse } from '../../dtos/manner-tag.response';

@QueryHandler(FindMannerTagsQuery)
export class FindMannerTagsHandler extends PrismaQueryHandler<
  FindMannerTagsQuery,
  MannerTagResponse
> {
  constructor() {
    super(MannerTagResponse);
  }

  async execute(query: FindMannerTagsQuery): Promise<MannerTagResponse[]> {
    const mannerTags = await this.prismaService.mannerTag.findMany({
      orderBy: {
        position: 'asc',
      },
    });
    return this.parseResponses(mannerTags);
  }
}
