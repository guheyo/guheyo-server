import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { RegisterDiscordUserRequest } from './register-discord-user.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class RegisterDiscordUserSlashCommandHandler {
  constructor(
    private readonly userClient: UserClient,
  ) {}

  @SlashCommand({ name: 'register-user', description: 'Register user in DB' })
  public async onCreateUser(
    @Context() [interaction]: SlashCommandContext,
    @Options() { discordMember }: RegisterDiscordUserRequest,
  ) {
    const user = await this.userClient.fetchSimpleUser('discord', discordMember);
    interaction.reply(`${user.username}<@${user.id}> registered`);
  }
}
