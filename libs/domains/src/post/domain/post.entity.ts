import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { Type } from 'class-transformer';
import { TagEntity } from '@lib/domains/tag/domain/tag.entity';
import { isUndefined, omitBy } from 'lodash';
import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
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

  categoryId: string | null;

  userId: string;

  @Type(() => UserEntity)
  user: UserEntity;

  @Type(() => TagEntity)
  tags: TagEntity[];

  @Type(() => BrandEntity)
  brands: BrandEntity[];

  constructor(partial: Partial<PostEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdatePostProps) {
    Object.assign(this, omitBy(props, isUndefined));
    if (props.tagIds) {
      this.tags = props.tagIds.map((tagId) => new TagEntity({ id: tagId }));
    }
  }

  isAuthorized(userId: string) {
    return this.userId === userId;
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
