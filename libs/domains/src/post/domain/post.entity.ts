import { AggregateRoot } from '@nestjs/cqrs';
import { REPORT_COMMENTED, REPORT_OPEN } from '@lib/domains/report/domain/report.constants';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { Type } from 'class-transformer';
import { TagEntity } from '@lib/domains/tag/domain/tag.entity';
import { isUndefined, omitBy } from 'lodash';
import { UpdatePostProps } from './post.types';

export class PostEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  archivedAt: Date | null;

  pending: string | null;

  type: string;

  title: string;

  slug: string | null;

  thumbnail: string | null;

  userAgent: string | null;

  ipAddress: string | null;

  reportCount: number;

  reportCommentCount: number;

  groupId: string;

  categoryId: string;

  userId: string;

  @Type(() => UserEntity)
  user: UserEntity;

  @Type(() => TagEntity)
  tags: TagEntity[];

  constructor(partial: Partial<PostEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdatePostProps) {
    Object.assign(this, omitBy(props, isUndefined));
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

  isUpdatedThumbnail(url: string) {
    return url !== this.thumbnail;
  }

  updateThumbnail(url: string) {
    this.thumbnail = url;
  }
}
