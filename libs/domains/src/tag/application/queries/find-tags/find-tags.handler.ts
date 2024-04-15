import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindTagsQuery } from './find-tags.query';
import { TagResponse } from '../../dtos/tag.response';

@QueryHandler(FindTagsQuery)
export class FindTagsHandler extends PrismaQueryHandler<FindTagsQuery, TagResponse> {
  constructor() {
    super(TagResponse);
  }

  async execute(query: FindTagsQuery): Promise<TagResponse[]> {
    const tags = await this.prismaService.tag.findMany({
      orderBy: {
        position: 'asc',
      },
    });
    return this.parseResponses(tags);
  }
}
