import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommentEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  source: string;

  authorId: string;

  author: UserEntity;

  parentId: string | null;

  postId: string | null;

  reportId: string | null;

  auctionId: string | null;

  content: string;

  parent?: CommentEntity;

  comments: CommentEntity[];

  constructor(partial: Partial<CommentEntity>) {
    super();
    Object.assign(this, partial);
  }
}
