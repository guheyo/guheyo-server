import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { UserParser } from '@app/bot/apps/user/parsers/user.parser';
import { RegisterDiscordUserRequest } from './register-discord-user.request';

@UseGuards(GuildGuard, OwnerGuard)
@Injectable()
export class RegisterDiscordUserSlashCommandHandler {
  constructor(
    private readonly userClient: UserClient,
    private readonly userParser: UserParser,
  ) {}

  @SlashCommand({ name: 'register-user', description: 'Register user in DB' })
  public async onCreateUser(
    @Context() [interaction]: SlashCommandContext,
    @Options() { discordMember }: RegisterDiscordUserRequest,
  ) {
    const user = await this.userClient.findUserBySocialAccount('discord', discordMember.id);
    if (user) interaction.reply(`${discordMember.user.username}<@${user.id}> already exists`);
    else {
      const input = this.userParser.parseCreateUserFromDiscordInput(discordMember);
      const newUser = await this.userClient.createUserFromDiscord(input);
      interaction.reply(`${newUser.username}<@${newUser.id}> registered`);
    }
  }
}
