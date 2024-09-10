import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { ForbiddenException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { FindReportPreviewsQuery } from './find-report-previews.query';
import { PaginatedReportPreviewsResponse } from './paginated-report-previews.response';
import { ReportPreviewResponse } from '../../dtos/report-preview.response';

@QueryHandler(FindReportPreviewsQuery)
export class FindReportPreviewsHandler extends PrismaQueryHandler {
  async execute(query: FindReportPreviewsQuery): Promise<PaginatedReportPreviewsResponse> {
    if (!!query.where?.userId && query.where.userId !== query.userId)
      throw new ForbiddenException(ReportErrorMessage.FIND_REPORTS_REQUEST_FROM_UNAUTHORIZED_USER);

    const where: Prisma.ReportWhereInput = query.where
      ? {
          type: query.where.type,
          reportedPostId: query.where.type === 'post' ? query.where.refId : undefined,
          reportedCommentId: query.where.type === 'comment' ? query.where.refId : undefined,
          userId: query.where.userId,
          reportedUserId: query.where.reportedUserId,
          groupId: query.where.groupId,
          status: query.where.status,
          reason: parseContainsSearcher({ keyword: query.keyword }),
          createdAt: query.where.createdAt
            ? {
                gt: new Date(query.where.createdAt.gt),
              }
            : undefined,
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const reports = await this.prismaService.report.findMany({
      where,
      include: {
        reportedUser: {
          include: {
            roles: {
              orderBy: {
                position: 'asc',
              },
            },
            socialAccounts: true,
          },
        },
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
    });

    return paginate<ReportPreviewResponse>(
      reports.map((report) => plainToInstance(ReportPreviewResponse, report)),
      'id',
      query.take,
    );
  }
}
