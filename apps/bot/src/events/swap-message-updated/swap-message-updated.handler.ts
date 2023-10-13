import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithMessagePipe } from '@app/bot/apps/user/pipes/parse-user-with-message.pipe';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';
import { ParseUpdateSwapInputPipe } from '@app/bot/apps/swap/pipes/parse-update-swap-input.pipe';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageUpdatedHandler {
  private readonly logger = new Logger(SwapMessageUpdatedHandler.name);

  constructor(private readonly swapClient: SwapClient) {}

  @On('messageUpdate')
  public async onUpdateSwapMessage(
    @Context(ParseUserWithMessagePipe, ParseUpdateSwapInputPipe)
    updateSwapInput: UpdateSwapInput,
  ) {
    await this.swapClient.updateSwap(updateSwapInput);
    this.logger.log(`Swap<@${updateSwapInput.id}> updated`);
  }
}
