import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';
import { ParseUserFromDeletedMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-deleted-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wtb')
@Injectable()
export class DemandMessageDeletedHandler {
  constructor(private readonly demandClient: DemandClient) {}

  @On('messageDelete')
  public async onDeleteOfferMessage(
    @Context(ParseUserFromDeletedMessagePipe)
    user: MyUserResponse,
    @Context()
    [message]: ContextOf<'messageDelete'>,
  ) {
    await this.demandClient.deleteDealFromMessage(user.id, message);
  }
}
