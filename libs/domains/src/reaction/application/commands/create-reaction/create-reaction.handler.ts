import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { ReactionEntity } from '@lib/domains/reaction/domain/reaction.entity';
import { CreateReactionCommand } from './create-reaction.command';
import { ReactionSavePort } from '../../ports/out/reaction.save.port';
import { ReactionLoadPort } from '../../ports/out/reaction.load.port';

@CommandHandler(CreateReactionCommand)
export class CreateReactionHandler implements ICommandHandler<CreateReactionCommand> {
  constructor(
    @Inject('ReactionLoadPort') private loadPort: ReactionLoadPort,
    @Inject('ReactionSavePort') private savePort: ReactionSavePort,
  ) {}

  async execute(command: CreateReactionCommand): Promise<void> {
    const existingReaction = await this.loadPort.findReaction({
      ...command,
      userId: command.user.id,
    });

    if (existingReaction) {
      existingReaction.readd();
      await this.savePort.save(existingReaction);
    } else {
      const reaction = new ReactionEntity({
        ...command,
        userId: command.user.id,
      });
      await this.savePort.create(reaction);
    }
  }
}
