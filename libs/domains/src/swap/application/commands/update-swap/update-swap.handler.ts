import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import _ from 'lodash';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { UpdateSwapCommand } from './update-swap.command';
import { SwapLoadPort } from '../../ports/out/swap.load.port';
import { SwapSavePort } from '../../ports/out/swap.save.port';
import { SwapPreviewResponse } from '../../dtos/swap-preview.response';

@CommandHandler(UpdateSwapCommand)
export class UpdateSwapHandler extends PrismaCommandHandler<
  UpdateSwapCommand,
  SwapPreviewResponse
> {
  constructor(
    @Inject('SwapLoadPort') private swapLoadPort: SwapLoadPort,
    @Inject('SwapSavePort') private swapSavePort: SwapSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(SwapPreviewResponse);
  }

  async execute(command: UpdateSwapCommand): Promise<SwapPreviewResponse> {
    let swap = await this.swapLoadPort.findById(command.id);
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_NOT_FOUND);
    if (!swap.isAuthorized(command.proposerId))
      throw new ForbiddenException(SwapErrorMessage.SWAP_CHANGES_FROM_UNAUTHORIZED_USER);
    if (swap.hasUncommentedReports())
      throw new ForbiddenException(SwapErrorMessage.UNCOMMENTED_REPORT_EXISTS);

    swap = this.publisher.mergeObjectContext(swap);
    swap.update(
      _.pick(command, [
        'id',
        'name0',
        'name1',
        'description0',
        'description1',
        'price',
        'priceCurrency',
        'shippingCost',
        'shippingType',
        'businessFunction',
        'productCategoryId',
        'status',
        'brandId',
      ]),
    );
    await this.swapSavePort.save(swap);
    swap.commit();
    return this.parseResponse(swap);
  }
}
