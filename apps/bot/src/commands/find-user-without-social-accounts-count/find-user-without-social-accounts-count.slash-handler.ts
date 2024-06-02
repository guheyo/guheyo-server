import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { FindUserWithoutSocialAccountsCountRequest } from './find-user-without-social-accounts-count.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class FindUserWithoutSocialAccountsCountSlashHandler {
  constructor(private readonly userClient: UserClient) {}

  @SlashCommand({
    name: 'user-without-socials-count',
    description: 'User without social accounts count',
  })
  async findUserWithoutSocialAccountsCount(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { providers }: FindUserWithoutSocialAccountsCountRequest,
  ) {
    const providerNames = providers.split(',').map((provider) => provider.trim());
    const count = await this.userClient.findUserWithoutSocialAccountsCount(providerNames);
    return interaction.reply(`user without social accounts [${providers}] count: ${count}`);
  }
}
