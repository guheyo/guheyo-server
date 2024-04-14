import { AggregateRoot } from '@nestjs/cqrs';
import { REPORT_COMMENTED, REPORT_OPEN } from '@lib/domains/report/domain/report.constants';

export class PostEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  archivedAt: Date | null;

  pending: string | null;

  type: string;

  title: string;

  slug: string | null;

  content: string | null;

  thumbnail: string | null;

  userAgent: string | null;

  ipAddress: string | null;

  reportCount: number;

  reportCommentCount: number;

  groupId: string;

  categoryId: string;

  userId: string;

  constructor(partial: Partial<PostEntity>) {
    super();
    Object.assign(this, partial);
  }

  isAuthorized(userId: string) {
    return this.userId === userId;
  }

  checkReports(reportStatus: string) {
    if (reportStatus === REPORT_OPEN) {
      this.reportCount += 1;
    } else if (reportStatus === REPORT_COMMENTED) {
      this.reportCommentCount += 1;
    }
  }

  hasUncommentedReports() {
    return this.reportCount - this.reportCommentCount > 0;
  }
}
