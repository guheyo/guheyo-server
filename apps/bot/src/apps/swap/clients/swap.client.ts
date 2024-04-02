import { Injectable } from '@nestjs/common';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { CreateSwapCommand } from '@lib/domains/swap/application/commands/create-swap/create-swap.command';
import { UpdateSwapCommand } from '@lib/domains/swap/application/commands/update-swap/update-swap.command';
import { DeleteSwapCommand } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.command';
import { DeleteSwapArgs } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.args';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DealClient } from '../../deal/clients/deal.client';
import { SwapParser } from '../parsers/swap.parser';

@Injectable()
export class SwapClient extends DealClient {
  constructor(protected readonly dealParser: SwapParser) {
    super('swap', dealParser);
  }

  async createDeal({ input, user }: { input: CreateSwapInput; user: MyUserResponse }) {
    await this.commandBus.execute(new CreateSwapCommand({ input, user }));
  }

  async updateDeal(input: UpdateSwapInput) {
    await this.commandBus.execute(new UpdateSwapCommand(input));
  }

  async deleteDeal(args: DeleteSwapArgs) {
    await this.commandBus.execute(new DeleteSwapCommand(args));
  }
}
