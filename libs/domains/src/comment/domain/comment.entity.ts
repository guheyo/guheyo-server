import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { UpdateCommentProps } from './comment.interfaces';

export class CommentEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  userId: string;

  postId: string;

  parentId: string | null;

  content: string;

  userAgent: string | null;

  ipAddress: string | null;

  constructor(partial: Partial<CommentEntity>) {
    super();
    Object.assign(this, partial);
  }

  isAuthorized(userId: string) {
    return this.userId === userId;
  }

  update(props: UpdateCommentProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
