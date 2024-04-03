import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { SwapEntity } from '@lib/domains/swap/domain/swap.entity';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { DAILY_SWAP_POSTING_LIMIT } from '@lib/domains/swap/domain/swap.constants';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { DAY_HOURS } from '@lib/domains/offer/domain/offer.constants';
import { CreateSwapCommand } from './create-swap.command';
import { SwapSavePort } from '../../ports/out/swap.save.port';
import { SwapResponse } from '../../dtos/swap.response';

@CommandHandler(CreateSwapCommand)
export class CreateSwapHandler extends PrismaCommandHandler<CreateSwapCommand, SwapResponse> {
  constructor(
    @Inject('SwapSavePort') private savePort: SwapSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(SwapResponse);
  }

  async execute(command: CreateSwapCommand): Promise<void> {
    if (command.proposerId !== command.user.id)
      throw new ForbiddenException(SwapErrorMessage.CREATE_REQUEST_FROM_UNAUTHORIZED_USER);

    const countDailySwapPostingInSameCategory = await this.prismaService.swap.countSwap({
      proposerId: command.proposerId,
      productCategoryId: command.productCategoryId,
      fromHours: DAY_HOURS,
    });
    if (countDailySwapPostingInSameCategory > DAILY_SWAP_POSTING_LIMIT)
      throw new ForbiddenException(SwapErrorMessage.DAILY_SWAP_POSTING_LIMIT_EXCEEDED);

    const swap = this.publisher.mergeObjectContext(new SwapEntity(command));
    swap.create();
    await this.savePort.create(swap);
    swap.commit();
  }
}
