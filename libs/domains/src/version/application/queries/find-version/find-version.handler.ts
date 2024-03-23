import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { VersionErrorMessage } from '@lib/domains/version/domain/version.error.message';
import { FindVersionQuery } from './find-version.query';
import { VersionResponse } from '../../dtos/version.response';

@QueryHandler(FindVersionQuery)
export class FindVersionHandler extends PrismaQueryHandler<FindVersionQuery, VersionResponse> {
  constructor() {
    super(VersionResponse);
  }

  async execute(query: FindVersionQuery): Promise<VersionResponse | null> {
    const where = query.id
      ? {
          id: query.id,
        }
      : query.refId
      ? {
          refId: query.refId,
        }
      : null;
    if (!where) throw new NotFoundException(VersionErrorMessage.VERSION_NOT_FOUND);

    const version = await this.prismaService.version.findFirst({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return this.parseResponse(version);
  }
}
