import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ReactionErrorMessage } from '@lib/domains/reaction/domain/reaction.error.message';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { CancelReactionCommand } from './cancel-reaction.command';
import { ReactionLoadPort } from '../../ports/out/reaction.load.port';
import { ReactionSavePort } from '../../ports/out/reaction.save.port';
import { parseReactionCanceledTriggerName } from '../../subscriptions/reaction-canceled/parse-reaction-canceled-trigger-name';

@CommandHandler(CancelReactionCommand)
export class CancelReactionHandler implements ICommandHandler<CancelReactionCommand> {
  constructor(
    @Inject('ReactionSavePort') private savePort: ReactionSavePort,
    @Inject('ReactionLoadPort') private loadPort: ReactionLoadPort,
  ) {}

  async execute(command: CancelReactionCommand): Promise<void> {
    if (!command.postId && !command.commentId)
      throw new ForbiddenException(ReactionErrorMessage.INVALID_REACTION_REQUEST);

    const reaction = await this.loadPort.findReaction({
      emojiId: command.emojiId,
      postId: command.postId,
      commentId: command.commentId,
      userId: command.user.id,
    });
    if (!reaction) throw new NotFoundException(ReactionErrorMessage.REACTION_NOT_FOUND);

    if (!reaction.isAuthorized(command.user.id)) {
      throw new ForbiddenException(
        ReactionErrorMessage.REACTION_CANCEL_REQUEST_FROM_UNAUTHORIZED_USER,
      );
    }

    reaction.cancel();
    await this.savePort.save(reaction);

    await GraphqlPubSub.publish(
      parseReactionCanceledTriggerName({
        type: reaction.commentId ? 'comment' : 'post',
        postId: reaction.postId,
      }),
      {
        reactionCanceled: {
          id: reaction.id,
          postId: reaction.postId,
          commentId: reaction.commentId,
        },
      },
    );
  }
}
