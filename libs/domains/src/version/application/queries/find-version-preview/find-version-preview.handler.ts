import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { VersionErrorMessage } from '@lib/domains/version/domain/version.error.message';
import { plainToInstance } from 'class-transformer';
import { FindVersionPreviewQuery } from './find-version-preview.query';
import { VersionPreviewResponse } from '../../dtos/version-preview.response';

@QueryHandler(FindVersionPreviewQuery)
export class FindVersionPreviewHandler extends PrismaQueryHandler {
  async execute(query: FindVersionPreviewQuery): Promise<VersionPreviewResponse | null> {
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
    return plainToInstance(VersionPreviewResponse, version);
  }
}
