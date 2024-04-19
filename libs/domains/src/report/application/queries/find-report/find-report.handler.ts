import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { toPascalCase } from '@lib/shared/pascal-case/to-pascal-case';
import { ReportResponse } from '../../dtos/report.response';
import { FindReportQuery } from './find-report.query';

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
        reportedPost: {
          include: {
            offer: true,
            auction: true,
            userReview: true,
          },
        },
        reportedComment: true,
      },
    });
    if (!report) throw new NotFoundException(ReportErrorMessage.REPORT_NOT_FOUND);
    if (report.type === 'post' && report.reportedPostId && report.reportedPost) {
      const postType = report.reportedPost.type;
      let refId;
      if (postType === 'offer') refId = report.reportedPost.offer?.id;
      if (postType === 'auction') refId = report.reportedPost.auction?.id;
      if (postType === 'userReview') refId = report.reportedPost.userReview?.id;
      if (!refId) throw new NotFoundException(ReportErrorMessage.REF_ID_OF_VERSION_NOT_FOUND);

      const version = await this.prismaService.version.findFirst({
        where: {
          tableName: toPascalCase(postType),
          refId,
          createdAt: {
            lt: report.createdAt,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (!version) throw new NotFoundException(ReportErrorMessage.REPORT_REF_VERSION_NOT_FOUND);

      const images = await this.prismaService.userImage.findMany({
        where: {
          type: postType,
          refId: version.refId,
          createdAt: {
            lt: report.createdAt,
          },
          OR: [
            {
              deletedAt: {
                gt: report.createdAt,
              },
            },
            {
              deletedAt: null,
            },
          ],
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return this.parseResponse({
        ...report,
        version: {
          ...version,
          images,
        },
      });
    }
    if (report.type === 'comment' && report.reportedCommentId) {
      const version = await this.prismaService.version.findFirst({
        where: {
          tableName: toPascalCase(report.type),
          refId: report.reportedCommentId,
          createdAt: {
            lt: report.createdAt,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (!version) throw new NotFoundException(ReportErrorMessage.REPORT_REF_VERSION_NOT_FOUND);

      return this.parseResponse({
        ...report,
        version: {
          ...version,
          images: [],
        },
      });
    }
    throw new NotFoundException(ReportErrorMessage.REPORT_TYPE_NOT_FOUND);
  }
}
