import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { VersionEntity } from '@lib/domains/version/domain/version.entity';
import { ReportCreatedEvent } from '../application/events/report-created/report-created.event';
import { ReportStatusUpdatedEvent } from '../application/events/report-status-updated/report-status-updated.event';
import { REPORT_COMMENTED_PREFIX, REPORT_OPEN } from './report.constants';
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
      }),
    );
  }

  isAuthorized(authorId: string) {
    const refValues = JSON.parse(this.refVersion.values.toString());
    switch (this.refVersion.tableName) {
      case 'Offer': {
        return refValues.sellerId === authorId;
      }
      case 'Demand': {
        return refValues.buyerId === authorId;
      }
      case 'Swap': {
        return refValues.proposerId === authorId;
      }
      default:
        return refValues.authorId === authorId;
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
    this.status = this.comments.length
      ? `${REPORT_COMMENTED_PREFIX}#${this.comments.length}`
      : REPORT_OPEN;

    if (this.status !== prevStatus) {
      this.apply(
        new ReportStatusUpdatedEvent({
          type: this.type,
          refId: this.refVersionId,
          reportStatus: this.status,
        }),
      );
    }
  }
}
