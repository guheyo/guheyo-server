import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { CommentTypeIdString, CommentType } from './comment.types';
import { UpdateCommentProps } from './comment.interfaces';

export class CommentEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: CommentType;

  authorId: string;

  content: string;

  source: string;

  parentId: string | null;

  postId: string | null;

  reportId: string | null;

  auctionId: string | null;

  parent?: CommentEntity;

  comments: CommentEntity[];

  constructor(partial: Partial<CommentEntity>) {
    super();
    Object.assign(this, partial);
  }

  setRefId(refId: string) {
    const key = this.parseTypeIdString();
    this[key] = refId;
  }

  parseTypeIdString(): CommentTypeIdString {
    if (this.type === 'comment') return 'parentId';
    return `${this.type}Id`;
  }

  isAuthorized(authorId: string) {
    return this.authorId === authorId;
  }

  update(props: UpdateCommentProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
