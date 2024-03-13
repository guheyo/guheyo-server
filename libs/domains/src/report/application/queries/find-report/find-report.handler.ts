import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { NotFoundException } from '@nestjs/common';
import { FindReportQuery } from './find-report.query';
import { ReportResponse } from '../../dtos/report.response';

@QueryHandler(FindReportQuery)
export class FindReportHandler extends PrismaQueryHandler<FindReportQuery, ReportResponse> {
  constructor() {
    super(ReportResponse);
  }

  async execute(query: FindReportQuery): Promise<ReportResponse | null> {
    const where = query.id
      ? {
          id: query.id,
        }
      : query.authorId && query.type && (query.demandId || query.offerId || query.swapId)
      ? {
          authorId: query.authorId,
          type: query.type,
          offerId: query.offerId,
          demandId: query.demandId,
          swapId: query.swapId,
        }
      : null;
    if (!where) throw new NotFoundException(ReportErrorMessage.REPORT_IS_NOT_FOUND);

    const report = await this.prismaService.report.findFirst({
      where,
      include: {
        author: {
          include: {
            members: {
              include: {
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
    });
    return this.parseResponse(report);
  }
}
