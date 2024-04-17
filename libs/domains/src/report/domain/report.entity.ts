import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { validateCooldown } from '@lib/shared/cooldown/validate-cooldown';
import { Type } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { ReportCreatedEvent } from '../application/events/report-created/report-created.event';
import { ReportStatusUpdatedEvent } from '../application/events/report-status-updated/report-status-updated.event';
import { REPORT_COMMENTED, REPORT_OPEN } from './report.constants';
import { CommentReportInput } from '../application/commands/comment-report/comment-report.input';
import { ReportedUserEntity } from './reported-user.entity';
import { ReportErrorMessage } from './report.error.message';
import { CheckedReportedUserEvent } from '../application/events/checked-reported-user/checked-reported-user.event';
import { CreateReportCommentInput } from '../application/commands/create-report-comment/create-report-comment.input';
import { ReportCommentedEvent } from '../application/events/report-commented/report-commented.event';
import { ReportCommentEntity } from './report-comment.entity';

export class ReportEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  userId: string;

  @Type(() => ReportedUserEntity)
  reportedUser: ReportedUserEntity;

  reportedUserId: string;

  type: string;

  reportedPostId: string | null;

  @Type(() => PostEntity)
  reportedPost: PostEntity | null;

  reportedCommentId: string | null;

  @Type(() => CommentEntity)
  reportedComment: CommentEntity | null;

  groupId: string;

  status: string;

  reason: string;

  description: string | null;

  @Type(() => ReportCommentEntity)
  comments: ReportCommentEntity[];

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
        reportedPostId: this.reportedPostId || undefined,
        reportedCommentId: this.reportedCommentId || undefined,
        reportStatus: this.status,
      }),
    );
  }

  validateCommenter(userId: string) {
    return this.reportedUserId === userId;
  }

  parseCreateReportCommentInput({
    input,
    userId,
  }: {
    input: CommentReportInput;
    userId: string;
  }): CreateReportCommentInput {
    return {
      id: input.id,
      reportId: this.id,
      userId,
      content: input.content,
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
          reportedPostId: this.reportedPostId || undefined,
          reportedCommentId: this.reportedCommentId || undefined,
          reportStatus: this.status,
        }),
      );
    }
  }

  findComment(commentId: string) {
    return this.comments.find((comment) => comment.id === commentId);
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
