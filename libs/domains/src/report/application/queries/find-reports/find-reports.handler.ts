import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { FindReportsQuery } from './find-reports.query';
import { PaginatedReportsResponse } from './paginated-reports.response';
import { ReportResponse } from '../../dtos/report.response';

@QueryHandler(FindReportsQuery)
export class FindReportsHandler extends PrismaQueryHandler<FindReportsQuery, ReportResponse> {
  constructor() {
    super(ReportResponse);
  }

  async execute(query: FindReportsQuery): Promise<PaginatedReportsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const reports = await this.prismaService.report.findMany({
      where: {
        offerId: query.where?.type === 'offer' ? query.where.refId : undefined,
        demandId: query.where?.type === 'demand' ? query.where.refId : undefined,
        swapId: query.where?.type === 'swap' ? query.where.refId : undefined,
        title: parseFollowedBySearcher(query.keyword),
        createdAt: query.where?.createdAt
          ? {
              gt: new Date(query.where.createdAt.gt),
            }
          : undefined,
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
      distinct: query.distinct ? ['title', 'authorId'] : undefined,
    });

    return paginate<ReportResponse>(this.parseResponses(reports), 'id', query.take);
  }
}
