import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';
import { SwapParser } from '@app/bot/apps/swap/parsers/swap.parser';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageUpdatedHandler {
  private readonly logger = new Logger(SwapMessageUpdatedHandler.name);

  constructor(
    private readonly swapParser: SwapParser,
    private readonly swapClient: SwapClient,
  ) {}

  @On('messageUpdate')
  public async onUpdateSwapMessage(
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    const updateSwapInput = this.swapParser.parseUpdateDealInput(message);
    await this.swapClient.updateSwap(updateSwapInput);
    this.logger.log(`Swap<@${updateSwapInput.id}> updated`);
  }
}
