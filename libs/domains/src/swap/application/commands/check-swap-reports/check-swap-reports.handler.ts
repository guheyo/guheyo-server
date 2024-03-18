import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { CheckSwapReportsCommand } from './check-swap-reports.command';
import { SwapLoadPort } from '../../ports/out/swap.load.port';
import { SwapSavePort } from '../../ports/out/swap.save.port';

@CommandHandler(CheckSwapReportsCommand)
export class CheckSwapReportsHandler implements ICommandHandler<CheckSwapReportsCommand> {
  constructor(
    @Inject('SwapLoadPort') private loadPort: SwapLoadPort,
    @Inject('SwapSavePort') private savePort: SwapSavePort,
  ) {}

  async execute(event: CheckSwapReportsCommand) {
    if (event.type !== 'swap') return;

    const swap = await this.loadPort.findById(event.refId);
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_NOT_FOUND);

    swap.checkReports();
    this.savePort.save(swap);
  }
}
