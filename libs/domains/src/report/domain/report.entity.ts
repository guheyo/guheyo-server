import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { ReportCreatedEvent } from '../application/events/report-created/report-created.event';
import { ReportStatusUpdatedEvent } from '../application/events/report-status-updated/report-status-updated.event';
import { ReportTypeIdString } from './report.types';
import { REPORT_COMMENTED_PREFIX, REPORT_OPEN } from './report.constants';

export class ReportEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  refId: string;

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

  create(refId: string) {
    this.apply(
      new ReportCreatedEvent({
        type: this.type,
        refId,
        status: this.status,
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
          refId: this.refId,
          status: this.status,
        }),
      );
    }
  }

  parseTypeIdString(): ReportTypeIdString {
    return `${this.type}Id` as ReportTypeIdString;
  }
}
