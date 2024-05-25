import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindTagsQuery } from './find-tags.query';
import { TagResponse } from '../../dtos/tag.response';

@QueryHandler(FindTagsQuery)
export class FindTagsHandler extends PrismaQueryHandler {
  async execute(query: FindTagsQuery): Promise<TagResponse[]> {
    const tags = await this.prismaService.tag.findMany({
      orderBy: {
        position: 'asc',
      },
    });
    return tags.map((tag) => plainToClass(TagResponse, tag));
  }
}
