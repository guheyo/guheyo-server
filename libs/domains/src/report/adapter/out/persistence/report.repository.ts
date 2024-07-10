import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { ReportLoadPort } from '@lib/domains/report/application/ports/out/report.load.port';
import { ReportSavePort } from '@lib/domains/report/application/ports/out/report.save.port';
import { CreateReportCommentInput } from '@lib/domains/report/application/commands/create-report-comment/create-report-comment.input';
import { ReportCommentEntity } from '@lib/domains/report/domain/report-comment.entity';

@Injectable()
export class ReportRepository
  extends PrismaRepository<ReportEntity>
  implements ReportLoadPort, ReportSavePort
{
  constructor() {
    super(ReportEntity);
  }

  async findById(id: string): Promise<ReportEntity | null> {
    const report = await this.prismaService.report.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        reportedUser: {
          include: {
            roles: {
              orderBy: {
                position: 'asc',
              },
            },
            receivedReports: {
              select: {
                id: true,
                createdAt: true,
                status: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });
    return this.toEntity(report);
  }

  async findLastSubmittedReport(userId: string): Promise<ReportEntity | null> {
    const report = await this.prismaService.report.findFirst({
      where: {
        userId,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        reportedUser: {
          include: {
            roles: {
              orderBy: {
                position: 'asc',
              },
            },
            receivedReports: {
              select: {
                id: true,
                createdAt: true,
                status: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return this.toEntity(report);
  }

  async create(report: ReportEntity): Promise<void> {
    await this.prismaService.report.create({
      data: _.pick(report, [
        'id',
        'type',
        'reportedPostId',
        'reportedCommentId',
        'userId',
        'reportedUserId',
        'groupId',
        'reason',
        'description',
        'status',
        'userAgent',
        'ipAddress',
      ]),
    });
  }

  async createMany(reports: ReportEntity[]): Promise<void> {
    await Promise.all(reports.map((report) => this.create(report)));
  }

  async save(report: ReportEntity): Promise<void> {
    await this.prismaService.report.update({
      where: {
        id: report.id,
      },
      data: _.pick(report, ['reason', 'description', 'status']),
    });
  }

  async delete(report: ReportEntity): Promise<void> {
    await this.prismaService.report.delete({
      where: {
        id: report.id,
      },
    });
  }

  async createComment(input: CreateReportCommentInput): Promise<ReportCommentEntity> {
    const comment = await this.prismaService.reportComment.create({
      data: {
        id: input.id,
        reportId: input.reportId,
        userId: input.userId,
        content: input.content,
      },
    });
    return new ReportCommentEntity(comment);
  }

  async updateComment(reportComment: ReportCommentEntity): Promise<ReportCommentEntity> {
    const comment = await this.prismaService.reportComment.update({
      where: {
        id: reportComment.id,
      },
      data: {
        content: reportComment.content,
      },
    });
    return new ReportCommentEntity(comment);
  }
}
