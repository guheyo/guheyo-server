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
      orderBy: {
        createdAt: 'desc',
      },
    });
    return this.parseResponse(report);
  }
}
