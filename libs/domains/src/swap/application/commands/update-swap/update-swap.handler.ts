import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import _ from 'lodash';
import { UpdateSwapCommand } from './update-swap.command';
import { SwapLoadPort } from '../../ports/out/swap.load.port';
import { SwapSavePort } from '../../ports/out/swap.save.port';

@CommandHandler(UpdateSwapCommand)
export class UpdateSwapHandler implements ICommandHandler<UpdateSwapCommand> {
  constructor(
    @Inject('SwapLoadPort') private swapLoadPort: SwapLoadPort,
    @Inject('SwapSavePort') private swapSavePort: SwapSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateSwapCommand): Promise<void> {
    let swap = await this.swapLoadPort.findById(command.id);
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_IS_NOT_FOUND);

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
        'businessFunction',
        'brandId',
      ]),
    );
    await this.swapSavePort.save(swap);
    swap.commit();
  }
}