import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';
import { ParseGuildPipe } from '@app/bot/apps/guild/pipes/parse-guild.pipe';
import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageCreatedHandler {
  constructor(private readonly swapClient: SwapClient) {}

  @On('messageCreate')
  public async onCreateSwapMessage(
    @Context(ParseUserFromMessagePipe)
    user: SimpleUser,
    @Context(ParseGuildPipe)
    guild: GuildResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    await this.swapClient.createDealFromMessage(user.id, message, guild);
  }
}
