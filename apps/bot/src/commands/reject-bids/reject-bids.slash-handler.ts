import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { BidClient } from '@app/bot/apps/auction/clients/bid.client';
import { RejectBidsRequest } from './reject-bids.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class RejectBidsSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
    private readonly bidClient: BidClient,
  ) {}

  private readonly logger = new Logger(RejectBidsSlashHandler.name);

  @SlashCommand({
    name: 'reject-bids',
    description: 'Reject bids',
  })
  public async onRejectBids(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { memberId }: RejectBidsRequest,
  ) {
    const { guild } = interaction;
    if (!guild) return interaction.reply('guild id not found');

    const user = await this.userClient.findMyUser('discord', memberId);
    if (!user) return interaction.reply(`user<@${memberId}> not found`);

    await this.bidClient.rejectBids({ userId: user.id });

    const message = `Rejected member<@${memberId}> bids`;
    this.logger.log(message);
    return interaction.reply(message);
  }
}
