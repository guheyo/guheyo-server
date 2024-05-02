import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindReportCommentQuery } from './find-report-comment.query';
import { ReportCommentResponse } from '../../dtos/report-comment.response';

@QueryHandler(FindReportCommentQuery)
export class FindReportCommentHandler extends PrismaQueryHandler<
  FindReportCommentQuery,
  ReportCommentResponse
> {
  constructor() {
    super(ReportCommentResponse);
  }

  async execute(query: FindReportCommentQuery): Promise<ReportCommentResponse | null> {
    const report = await this.prismaService.reportComment.findFirst({
      where: {
        reportId: query.reportId,
      },
      include: {
        user: {
          include: {
            roles: {
              include: {
                group: true,
              },
              orderBy: {
                position: 'asc',
              },
            },
            socialAccounts: true,
          },
        },
      },
    });
    return this.parseResponse(report);
  }
}
