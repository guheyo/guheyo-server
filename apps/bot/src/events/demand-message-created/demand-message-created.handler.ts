import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';
import { ParseGuildPipe } from '@app/bot/apps/guild/pipes/parse-guild.pipe';
import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtb')
@Injectable()
export class DemandMessageCreatedHandler {
  constructor(private readonly demandClient: DemandClient) {}

  @On('messageCreate')
  public async onCreateDemandMessage(
    @Context(ParseUserFromMessagePipe)
    user: SimpleUser,
    @Context(ParseGuildPipe)
    guild: GuildResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    this.demandClient.createDemandFromMessage(user.id, message, guild);
  }
}
