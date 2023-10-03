import { Injectable, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GuildGuard } from '@app/bot/guards/guilds/guild.guard';
import { OwnerGuard } from '@app/bot/guards/users/owner.guard';
import { CreateJoinedUserCommand } from '@lib/domains/user/application/commands/create-joined-user/create-joined-user.command';
import { DiscordIdConverter } from '@app/bot/shared/discord-id-converter';
import { RegisterDiscordUserRequest } from './register-discord-user.request';

@UseGuards(GuildGuard, OwnerGuard)
@Injectable()
export class RegisterDiscordUserSlashCommandHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly discordIdConverter: DiscordIdConverter,
  ) {}

  @SlashCommand({ name: 'register-user', description: 'Register user in DB' })
  public async onCreateUser(
    @Context() [interaction]: SlashCommandContext,
    @Options() { user }: RegisterDiscordUserRequest,
  ) {
    await this.commandBus.execute(
      new CreateJoinedUserCommand({
        username: user.username,
        avatarURL: user.avatarURL() || undefined,
        socialAccountId: this.discordIdConverter.convertIdUsingDiscordNamespace(user.id),
        provider: 'discord',
        socialId: user.id,
        guildId: this.discordIdConverter.convertIdUsingDiscordNamespace(interaction.guildId!),
        memberId: this.discordIdConverter.convertIdUsingGuildNamespace(user.id),
        roleIds: [],
      }),
    );
    interaction.reply(`User registered`);
  }
}
