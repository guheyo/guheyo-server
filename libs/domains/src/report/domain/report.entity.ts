import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { pick } from 'lodash';
import { InternalServerErrorException } from '@nestjs/common';
import { ReportCreatedEvent } from '../application/events/report-created/report-created.event';
import { ReportStatusUpdatedEvent } from '../application/events/report-status-updated/report-status-updated.event';
import { ReportTypeIdString } from './report.types';
import { ReportErrorMessage } from './report.error.message';

export class ReportEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  offerId: string | null;

  demandId: string | null;

  swapId: string | null;

  status: string;

  authorId: string;

  title: string;

  content: string | null;

  comments: CommentEntity[];

  constructor(partial: Partial<ReportEntity>) {
    super();
    Object.assign(this, partial);
    this.status = 'open';
  }

  create(refId: string) {
    this.apply(
      new ReportCreatedEvent({
        type: this.type,
        refId,
      }),
    );
  }

  checkComments() {
    const prevStatus = this.status;
    this.status = this.comments.length ? 'commented' : 'open';
    const refId = this.getRefId();

    if (!refId) {
      throw new InternalServerErrorException(ReportErrorMessage.FAILED_TO_FIND_REF_ID_OF_REPORT);
    }

    if (this.status !== prevStatus) {
      this.apply(
        new ReportStatusUpdatedEvent({
          type: this.type,
          refId,
        }),
      );
    }
  }

  parseTypeIdString(): ReportTypeIdString {
    return `${this.type}Id` as ReportTypeIdString;
  }

  getRefId() {
    const key = this.parseTypeIdString();
    return this[key];
  }
}
