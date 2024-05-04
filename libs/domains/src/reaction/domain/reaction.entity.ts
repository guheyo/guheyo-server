import { AggregateRoot } from '@nestjs/cqrs';

export class ReactionEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  canceledAt: Date | null;

  emojiId: string;

  userId: string;

  postId: string | null;

  commentId: string | null;

  constructor(partial: Partial<ReactionEntity>) {
    super();
    Object.assign(this, partial);
  }

  isAuthorized(userId: string) {
    return this.userId === userId;
  }

  cancel() {
    this.canceledAt = new Date();
  }
}
