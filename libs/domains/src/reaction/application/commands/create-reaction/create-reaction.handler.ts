import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { ReactionEntity } from '@lib/domains/reaction/domain/reaction.entity';
import { CreateReactionCommand } from './create-reaction.command';
import { ReactionSavePort } from '../../ports/out/reaction.save.port';

@CommandHandler(CreateReactionCommand)
export class CreateReactionHandler implements ICommandHandler<CreateReactionCommand> {
  constructor(@Inject('ReactionSavePort') private savePort: ReactionSavePort) {}

  async execute(command: CreateReactionCommand): Promise<void> {
    const reawction = new ReactionEntity(command);
    await this.savePort.create(reawction);
  }
}
