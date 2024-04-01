import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindReportQuery } from './find-report.query';
import { ReportResponse } from '../../dtos/report.response';

@QueryHandler(FindReportQuery)
export class FindReportHandler extends PrismaQueryHandler<FindReportQuery, ReportResponse> {
  constructor() {
    super(ReportResponse);
  }

  async execute(query: FindReportQuery): Promise<ReportResponse | null> {
    const report = await this.prismaService.report.findFirst({
      where: {
        id: query.id,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return this.parseResponse(report);
  }
}
