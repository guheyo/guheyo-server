import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { CommentCreatedEvent } from '../application/events/comment-created/comment-created.event';
import { CommentTypeIdString, CommentType } from './comment.types';

export class CommentEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: CommentType;

  authorId: string;

  author: UserEntity;

  content: string;

  source: string;

  parentId: string | null;

  postId: string | null;

  reportId: string | null;

  auctionId: string | null;

  parent?: CommentEntity;

  comments: CommentEntity[];

  constructor({ partial, refId }: { partial: Partial<CommentEntity>; refId: string }) {
    super();
    Object.assign(this, partial);
    this.setRefId(refId);
  }

  setRefId(refId: string) {
    const key = this.parseTypeIdString();
    this[key] = refId;
  }

  parseTypeIdString(): CommentTypeIdString {
    if (this.type === 'comment') return 'parentId';
    return `${this.type}Id`;
  }

  create(refId: string) {
    this.apply(
      new CommentCreatedEvent({
        type: this.type,
        refId,
        authorId: this.authorId,
      }),
    );
  }
}
