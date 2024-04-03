import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { DAY_HOURS } from '@lib/domains/offer/domain/offer.constants';
import { DAILY_SWAP_POSTING_LIMIT } from '@lib/domains/swap/domain/swap.constants';
import { BumpSwapCommand } from './bump-swap.command';
import { SwapSavePort } from '../../ports/out/swap.save.port';
import { SwapLoadPort } from '../../ports/out/swap.load.port';
import { SwapPreviewResponse } from '../../dtos/swap-preview.response';

@CommandHandler(BumpSwapCommand)
export class BumpSwapHandler extends PrismaCommandHandler<BumpSwapCommand, SwapPreviewResponse> {
  constructor(
    @Inject('SwapSavePort') private swapSavePort: SwapSavePort,
    @Inject('SwapLoadPort') private swapLoadPort: SwapLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(SwapPreviewResponse);
  }

  async execute(command: BumpSwapCommand): Promise<SwapPreviewResponse> {
    let swap = await this.swapLoadPort.findById(command.input.swapId);
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_NOT_FOUND);
    if (!swap.isAuthorized(command.user.id))
      throw new ForbiddenException(SwapErrorMessage.SWAP_CHANGES_FROM_UNAUTHORIZED_USER);
    if (!swap.canBump()) throw new ForbiddenException(SwapErrorMessage.SWAP_BUMP_STUCK_ON_COOLDOWN);

    const countDailySwapPostingInSameCategory = await this.prismaService.swap.countSwap({
      proposerId: swap.proposerId,
      productCategoryId: swap.productCategoryId,
      fromHours: DAY_HOURS,
    });
    if (countDailySwapPostingInSameCategory > DAILY_SWAP_POSTING_LIMIT)
      throw new ForbiddenException(SwapErrorMessage.DAILY_SWAP_POSTING_LIMIT_EXCEEDED);

    swap = this.publisher.mergeObjectContext(swap);
    swap.bump(command.input);
    await this.swapSavePort.save(swap);
    swap.commit();
    return this.parseResponse(swap);
  }
}
