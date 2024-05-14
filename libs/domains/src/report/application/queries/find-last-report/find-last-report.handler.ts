import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindLastReportQuery } from './find-last-report.query';
import { LastReportResponse } from '../../dtos/last-report.response';

@QueryHandler(FindLastReportQuery)
export class FindLastReportHandler extends PrismaQueryHandler<
  FindLastReportQuery,
  LastReportResponse
> {
  constructor() {
    super(LastReportResponse);
  }

  async execute(query: FindLastReportQuery): Promise<LastReportResponse | null> {
    const report = await this.prismaService.report.findFirst({
      where: {
        userId: query.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return this.parseResponse(report);
  }
}
