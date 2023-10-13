import { Injectable } from '@nestjs/common';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { CreateSwapCommand } from '@lib/domains/swap/application/commands/create-swap/create-swap.command';
import { UpdateSwapCommand } from '@lib/domains/swap/application/commands/update-swap/update-swap.command';
import { DeleteSwapCommand } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.command';
import { UserImageClient } from '../../user-image/clients/user-image.client';

@Injectable()
export class SwapClient extends UserImageClient {
  async createSwap(input: CreateSwapInput) {
    await this.commandBus.execute(new CreateSwapCommand(input));
  }

  async updateSwap(input: UpdateSwapInput) {
    await this.commandBus.execute(new UpdateSwapCommand(input));
  }

  async deleteSwap(id: string) {
    await this.commandBus.execute(new DeleteSwapCommand(id));
  }
}
