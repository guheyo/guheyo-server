import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { ReportLoadPort } from '@lib/domains/report/application/ports/out/report.load.port';
import { ReportSavePort } from '@lib/domains/report/application/ports/out/report.save.port';

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
        refVersion: true,
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

  async findLastSubmittedReport(authorId: string): Promise<ReportEntity | null> {
    const report = await this.prismaService.report.findFirst({
      where: {
        authorId,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        refVersion: true,
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
        'refId',
        'refVersionId',
        'authorId',
        'reportedUserId',
        'title',
        'content',
        'status',
      ]),
    });
  }

  async createMany(reports: ReportEntity[]): Promise<void> {
    await this.prismaService.report.createMany({
      data: reports.map((report) =>
        _.pick(report, [
          'id',
          'type',
          'refId',
          'refVersionId',
          'authorId',
          'reportedUserId',
          'title',
          'content',
          'status',
        ]),
      ),
    });
  }

  async save(report: ReportEntity): Promise<void> {
    await this.prismaService.report.update({
      where: {
        id: report.id,
      },
      data: _.pick(report, ['title', 'content', 'status']),
    });
  }

  async delete(report: ReportEntity): Promise<void> {
    await this.prismaService.report.delete({
      where: {
        id: report.id,
      },
    });
  }
}
