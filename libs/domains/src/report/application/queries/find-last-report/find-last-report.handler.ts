import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindLastReportQuery } from './find-last-report.query';
import { ReportResponse } from '../../dtos/report.response';

@QueryHandler(FindLastReportQuery)
export class FindLastReportHandler extends PrismaQueryHandler<FindLastReportQuery, ReportResponse> {
  constructor() {
    super(ReportResponse);
  }

  async execute(query: FindLastReportQuery): Promise<ReportResponse | null> {
    const report = await this.prismaService.report.findFirst({
      where: {
        authorId: query.user.id,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return this.parseResponse(report);
  }
}
