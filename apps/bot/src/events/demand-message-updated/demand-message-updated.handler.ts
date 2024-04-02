import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wtb')
@Injectable()
export class DemandMessageUpdatedHandler {
  constructor(private readonly demandClient: DemandClient) {}

  @On('messageUpdate')
  public async onUpdateDemandMessage(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    await this.demandClient.updateDealFromMessage(user.id, message);
  }
}
