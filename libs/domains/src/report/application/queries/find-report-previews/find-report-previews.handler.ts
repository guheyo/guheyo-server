import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { ForbiddenException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { FindReportPreviewsQuery } from './find-report-previews.query';
import { PaginatedReportPreviewsResponse } from './paginated-report-previews.response';
import { ReportPreviewResponse } from '../../dtos/report-preview.response';

@QueryHandler(FindReportPreviewsQuery)
export class FindReportPreviewsHandler extends PrismaQueryHandler<
  FindReportPreviewsQuery,
  ReportPreviewResponse
> {
  constructor() {
    super(ReportPreviewResponse);
  }

  async execute(query: FindReportPreviewsQuery): Promise<PaginatedReportPreviewsResponse> {
    if (!!query.where?.authorId && query.where.authorId !== query.userId)
      throw new ForbiddenException(ReportErrorMessage.FIND_REPORTS_REQUEST_FROM_UNAUTHORIZED_USER);

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const reports = await this.prismaService.report.findMany({
      where: {
        type: query.where?.type && query.where.refId ? query.where.type : undefined,
        refId: query.where?.type && query.where.refId ? query.where.refId : undefined,
        reportedUserId: query.where?.reportedUserId,
        authorId: query.where?.authorId,
        title: parseFollowedBySearcher(query.keyword),
        createdAt: query.where?.createdAt
          ? {
              gt: new Date(query.where.createdAt.gt),
            }
          : undefined,
      },
      include: {
        reportedUser: {
          include: {
            members: {
              include: {
                group: true,
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
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

    return paginate<ReportPreviewResponse>(this.parseResponses(reports), 'id', query.take);
  }
}
