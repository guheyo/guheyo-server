import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ReactionErrorMessage } from '@lib/domains/reaction/domain/reaction.error.message';
import { CancelReactionCommand } from './cancel-reaction.command';
import { ReactionLoadPort } from '../../ports/out/reaction.load.port';
import { ReactionSavePort } from '../../ports/out/reaction.save.port';

@CommandHandler(CancelReactionCommand)
export class CancelReactionHandler implements ICommandHandler<CancelReactionCommand> {
  constructor(
    @Inject('ReactionSavePort') private savePort: ReactionSavePort,
    @Inject('ReactionLoadPort') private loadPort: ReactionLoadPort,
  ) {}

  async execute(command: CancelReactionCommand): Promise<void> {
    const reaction = await this.loadPort.findById(command.reactionId);
    if (!reaction) throw new NotFoundException(ReactionErrorMessage.REACTION_NOT_FOUND);

    if (!reaction.isAuthorized(command.user.id)) {
      throw new ForbiddenException(
        ReactionErrorMessage.REACTION_CANCEL_REQUEST_FROM_UNAUTHORIZED_USER,
      );
    }

    reaction.cancel();
    await this.savePort.save(reaction);
  }
}
