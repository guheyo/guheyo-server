import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
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
    if (!report) return null;
    if (report.authorId !== query.user.id)
      throw new ForbiddenException(ReportErrorMessage.FIND_REPORT_REQUEST_FROM_UNAUTHORIZED_USER);

    return this.parseResponse(report);
  }
}
