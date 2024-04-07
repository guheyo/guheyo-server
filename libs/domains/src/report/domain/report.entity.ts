import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { VersionEntity } from '@lib/domains/version/domain/version.entity';
import { validateCooldown } from '@lib/shared/cooldown/validate-cooldown';
import { Type } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { ReportCreatedEvent } from '../application/events/report-created/report-created.event';
import { ReportStatusUpdatedEvent } from '../application/events/report-status-updated/report-status-updated.event';
import { REPORT_COMMENTED, REPORT_OPEN } from './report.constants';
import { CommentReportInput } from '../application/commands/comment-report/comment-report.input';
import { ReportedUserEntity } from './reported-user.entity';
import { ReportErrorMessage } from './report.error.message';
import { CheckedReportedUserEvent } from '../application/events/checked-reported-user/checked-reported-user.event';
import { CreateReportCommentInput } from '../application/commands/create-report-comment/create-report-comment.input';
import { ReportCommentedEvent } from '../application/events/report-commented/report-commented.event';

export class ReportEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  refId: string;

  refVersionId: string;

  refVersion: VersionEntity;

  authorId: string;

  reportedUserId: string;

  @Type(() => ReportedUserEntity)
  reportedUser: ReportedUserEntity;

  groupId: string;

  status: string;

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
        reportId: this.id,
        type: this.type,
        refId: this.refId,
        reportStatus: this.status,
      }),
    );
  }

  validateCommenter(authorId: string) {
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

  parseCreateReportCommentInput(input: CommentReportInput): CreateReportCommentInput {
    return {
      id: input.id,
      type: 'report',
      reportId: this.id,
      authorId: input.authorId,
      content: input.content,
      source: input.source,
    };
  }

  commentReport() {
    this.apply(
      new ReportCommentedEvent({
        reportId: this.id,
      }),
    );
  }

  checkComments() {
    const prevStatus = this.status;
    this.status = this.comments.length ? REPORT_COMMENTED : REPORT_OPEN;

    if (this.status !== prevStatus) {
      this.apply(
        new ReportStatusUpdatedEvent({
          reportId: this.id,
          type: this.type,
          refId: this.refId,
          reportStatus: this.status,
        }),
      );
    }
  }

  validateSubmitTerm() {
    return validateCooldown(this.createdAt);
  }

  checkReportedUser() {
    if (!this.reportedUser) throw new NotFoundException(ReportErrorMessage.REPORTED_USER_NOT_FOUND);

    const input = this.reportedUser.checkReceivedReports();
    this.apply(new CheckedReportedUserEvent(input));
  }
}
