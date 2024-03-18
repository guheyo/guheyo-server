import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { BumpSwapCommand } from './bump-swap.command';
import { SwapSavePort } from '../../ports/out/swap.save.port';
import { SwapLoadPort } from '../../ports/out/swap.load.port';

@CommandHandler(BumpSwapCommand)
export class BumpSwapHandler implements ICommandHandler<BumpSwapCommand> {
  constructor(
    @Inject('SwapSavePort') private swapSavePort: SwapSavePort,
    @Inject('SwapLoadPort') private swapLoadPort: SwapLoadPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: BumpSwapCommand): Promise<void> {
    let swap = await this.swapLoadPort.findById(command.input.swapId);
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_NOT_FOUND);
    if (!swap.isAuthorized(command.input.proposerId))
      throw new ForbiddenException(SwapErrorMessage.SWAP_CHANGES_FROM_UNAUTHORIZED_USER);
    if (!swap.canBump()) throw new ForbiddenException(SwapErrorMessage.SWAP_BUMP_STUCK_ON_COOLDOWN);

    swap = this.publisher.mergeObjectContext(swap);
    swap.bump(command.input);
    await this.swapSavePort.save(swap);
    swap.commit();
  }
}
