import { ReactionEntity } from '@lib/domains/reaction/domain/reaction.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface ReactionLoadPort extends LoadPort<ReactionEntity> {
  findReaction: ({
    emojiId,
    postId,
    commentId,
    userId,
  }: {
    emojiId: string;
    postId: string;
    commentId?: string;
    userId: string;
  }) => Promise<ReactionEntity | null>;
}
