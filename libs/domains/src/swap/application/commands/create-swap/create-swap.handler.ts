import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { SwapEntity } from '@lib/domains/swap/domain/swap.entity';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { CreateSwapCommand } from './create-swap.command';
import { SwapSavePort } from '../../ports/out/swap.save.port';

@CommandHandler(CreateSwapCommand)
export class CreateSwapHandler implements ICommandHandler<CreateSwapCommand> {
  constructor(
    @Inject('SwapSavePort') private savePort: SwapSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateSwapCommand): Promise<void> {
    if (command.proposerId !== command.user.id)
      throw new ForbiddenException(SwapErrorMessage.CREATE_REQUEST_FROM_UNAUTHORIZED_USER);

    const swap = this.publisher.mergeObjectContext(new SwapEntity(command));
    swap.create();
    await this.savePort.create(swap);
    swap.commit();
  }
}
