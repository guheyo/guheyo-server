import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { FindReportCommentQuery } from './find-report-comment.query';
import { ReportCommentResponse } from '../../dtos/report-comment.response';

@QueryHandler(FindReportCommentQuery)
export class FindReportCommentHandler extends PrismaQueryHandler {
  async execute(query: FindReportCommentQuery): Promise<ReportCommentResponse | null> {
    const report = await this.prismaService.reportComment.findFirst({
      where: {
        reportId: query.reportId,
      },
      include: {
        user: {
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
    });
    return plainToInstance(ReportCommentResponse, report);
  }
}
