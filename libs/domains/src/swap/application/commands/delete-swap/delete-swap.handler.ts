import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { DeleteSwapCommand } from './delete-swap.command';
import { SwapLoadPort } from '../../ports/out/swap.load.port';
import { SwapSavePort } from '../../ports/out/swap.save.port';

@CommandHandler(DeleteSwapCommand)
export class DeleteSwapHandler implements ICommandHandler<DeleteSwapCommand> {
  constructor(
    @Inject('SwapLoadPort') private swapLoadPort: SwapLoadPort,
    @Inject('SwapSavePort') private swapSavePort: SwapSavePort,
  ) {}

  async execute(command: DeleteSwapCommand): Promise<void> {
    const swap = await this.swapLoadPort.findById(command.id);
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_NOT_FOUND);
    if (!swap.isAuthorized(command.proposerId))
      throw new ForbiddenException(SwapErrorMessage.SWAP_DELETE_COMMAND_FROM_UNAUTHORIZED_USER);

    await this.swapSavePort.delete(swap);
  }
}
