import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { REPORT_COMMENTED, REPORT_OPEN } from '@lib/domains/report/domain/report.constants';
import { PostCreatedEvent } from '../application/events/post-created/post-created.event';
import { UpdatePostProps } from './post.types';
import { PostUpdatedEvent } from '../application/events/post-updated/post-updated.event';

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

  create() {
    this.apply(
      new PostCreatedEvent({
        postId: this.id,
        type: this.type,
      }),
    );
  }

  isAuthorized(userId: string) {
    return this.userId === userId;
  }

  update(props: UpdatePostProps) {
    Object.assign(this, omitBy(props, isUndefined));
    this.apply(
      new PostUpdatedEvent({
        postId: this.id,
        type: this.type,
      }),
    );
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
