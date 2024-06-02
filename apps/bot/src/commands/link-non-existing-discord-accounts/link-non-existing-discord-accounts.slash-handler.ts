import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { LinkNonExistingDiscordAccountsRequest } from './link-non-existing-discord-accounts.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class LinkNonExistingDiscordAccountsSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  private readonly logger = new Logger(LinkNonExistingDiscordAccountsSlashHandler.name);

  @SlashCommand({
    name: 'link-non-existing-discords',
    description: 'Link non existing discord accounts',
  })
  async linkNonExistingDiscordAccounts(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { limit }: LinkNonExistingDiscordAccountsRequest,
  ) {
    const { guildId } = interaction;
    if (!guildId) return interaction.reply('guild id not found');

    const members = await this.groupClient.fetchMembers(guildId, limit);
    interaction.reply(
      `Check and create non-existing Discord accounts for ${members.length} members`,
    );

    const inputs = members.map((member) => ({
      provider: 'discord',
      socialId: member.id,
      username: member.user.username,
    }));
    const createdSocialAccountIds = await this.userClient.createNonExistingSocialAccounts(inputs);

    this.logger.log(`${createdSocialAccountIds}`);
    return this.logger.log(
      `${createdSocialAccountIds.length} non existing social accounts created`,
    );
  }
}
