import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { VersionEntity } from '@lib/domains/version/domain/version.entity';
import { ReportCreatedEvent } from '../application/events/report-created/report-created.event';
import { ReportStatusUpdatedEvent } from '../application/events/report-status-updated/report-status-updated.event';
import { REPORT_COMMENTED, REPORT_OPEN } from './report.constants';
import { CommentReportInput } from '../application/commands/comment-report/comment-report.input';
import { ReportCommentedEvent } from '../application/events/report-commented/report-commented.event';

export class ReportEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  refId: string;

  refVersionId: string;

  refVersion: VersionEntity;

  status: string;

  authorId: string;

  reportedUserId?: string;

  title: string;

  content: string | null;

  comments: CommentEntity[];

  constructor(partial: Partial<ReportEntity>) {
    super();
    Object.assign(this, partial);
    this.status = REPORT_OPEN;
  }

  create() {
    this.apply(
      new ReportCreatedEvent({
        type: this.type,
        refId: this.refId,
        reportStatus: this.status,
        reportedUserId: this.reportedUserId,
      }),
    );
  }

  isAuthorized(authorId: string) {
    switch (this.refVersion.tableName) {
      case 'Offer': {
        return this.refVersion.values.sellerId === authorId;
      }
      case 'Demand': {
        return this.refVersion.values.buyerId === authorId;
      }
      case 'Swap': {
        return this.refVersion.values.proposerId === authorId;
      }
      default:
        return this.refVersion.values.authorId === authorId;
    }
  }

  commentReport(input: CommentReportInput) {
    this.apply(
      new ReportCommentedEvent({
        id: input.id,
        reportId: input.reportId,
        authorId: input.authorId,
        content: input.content,
        source: input.source,
      }),
    );
  }

  checkComments() {
    const prevStatus = this.status;
    this.status = this.comments.length ? REPORT_COMMENTED : REPORT_OPEN;

    if (this.status !== prevStatus) {
      this.apply(
        new ReportStatusUpdatedEvent({
          type: this.type,
          refId: this.refId,
          reportStatus: this.status,
          reportedUserId: this.reportedUserId,
        }),
      );
    }
  }
}
