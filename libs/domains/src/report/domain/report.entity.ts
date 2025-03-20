import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { validateCooldown } from '@lib/shared/cooldown/validate-cooldown';
import { Type } from 'class-transformer';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { ReportCreatedEvent } from '../application/events/report-created/report-created.event';
import { REPORT_COMMENTED, REPORT_OPEN } from './report.constants';
import { ReportedUserEntity } from './reported-user.entity';
import { ReportCommentedEvent } from '../application/events/report-commented/report-commented.event';
import { ReportCommentEntity } from './report-comment.entity';
import { ReportCommentUpdatedEvent } from '../application/events/report-comment-updated/report-comment-updated.event';

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

  userAgent: string | null;

  ipAddress: string | null;

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
        reportedUserId: this.reportedUserId,
        reportedUserUsername: this.reportedUser.username,
        reportedUserAvatarURL: this.reportedUser.avatarURL || undefined,
        reason: this.reason,
        reportStatus: this.status,
      }),
    );
  }

  validateCommenter(userId: string) {
    return this.reportedUserId === userId;
  }

  commentReport() {
    this.apply(
      new ReportCommentedEvent({
        reportId: this.id,
      }),
    );
  }

  updateComment({ oldContent, newContent }: { oldContent: string; newContent: string }) {
    this.apply(
      new ReportCommentUpdatedEvent({
        reportId: this.id,
        reportedUserId: this.reportedUserId,
        oldContent,
        newContent,
      }),
    );
  }

  checkComments() {
    this.status = this.comments.length ? REPORT_COMMENTED : REPORT_OPEN;
  }

  findComment(commentId: string) {
    return this.comments.find((comment) => comment.id === commentId);
  }

  validateSubmitTerm() {
    return validateCooldown(this.createdAt);
  }
}
