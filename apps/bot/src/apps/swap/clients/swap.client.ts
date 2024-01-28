import { Injectable } from '@nestjs/common';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { CreateSwapCommand } from '@lib/domains/swap/application/commands/create-swap/create-swap.command';
import { UpdateSwapCommand } from '@lib/domains/swap/application/commands/update-swap/update-swap.command';
import { DeleteSwapCommand } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.command';
import { DealClient } from '../../deal/clients/deal.client';
import { SwapParser } from '../parsers/swap.parser';

@Injectable()
export class SwapClient extends DealClient {
  constructor(protected readonly dealParser: SwapParser) {
    super('swap', dealParser);
  }

  async createDeal(input: CreateSwapInput) {
    await this.commandBus.execute(new CreateSwapCommand(input));
  }

  async updateDeal(input: UpdateSwapInput) {
    await this.commandBus.execute(new UpdateSwapCommand(input));
  }

  async deleteDeal(id: string) {
    await this.commandBus.execute(new DeleteSwapCommand(id));
  }
}
