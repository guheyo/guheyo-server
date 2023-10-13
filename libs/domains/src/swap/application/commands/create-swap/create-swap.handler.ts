import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SwapEntity } from '@lib/domains/swap/domain/swap.entity';
import { CreateSwapCommand } from './create-swap.command';
import { SwapSavePort } from '../../ports/out/swap.save.port';

@CommandHandler(CreateSwapCommand)
export class CreateSwapHandler implements ICommandHandler<CreateSwapCommand> {
  constructor(
    @Inject('SwapSavePort') private savePort: SwapSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateSwapCommand): Promise<void> {
    const swap = this.publisher.mergeObjectContext(new SwapEntity(command));
    swap.create();
    await this.savePort.create(swap);
    swap.commit();
  }
}
