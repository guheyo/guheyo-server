import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindVersionQuery } from './find-version.query';
import { VersionResponse } from '../../dtos/version.response';

@QueryHandler(FindVersionQuery)
export class FindVersionHandler extends PrismaQueryHandler<FindVersionQuery, VersionResponse> {
  constructor() {
    super(VersionResponse);
  }

  async execute(query: FindVersionQuery): Promise<VersionResponse | null> {
    const version = await this.prismaService.version.findUnique({
      where: {
        id: query.id,
      },
    });

    if (!version) return null;

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: 'offer',
        refId: version.refId,
        createdAt: {
          lt: version.createdAt,
        },
        OR: [
          {
            deletedAt: {
              gt: version.createdAt,
            },
          },
          {
            deletedAt: null,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return this.parseResponse({
      ...version,
      images,
    });
  }
}
