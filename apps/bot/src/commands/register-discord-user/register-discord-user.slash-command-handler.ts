import { Injectable, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { CreateJoinedUserCommand } from '@lib/domains/user/application/commands/create-joined-user/create-joined-user.command';
import { GuildInterceptor } from '@app/bot/interceptors/guild.interceptor';
import { OwnerInterceptor } from '@app/bot/interceptors/owner.interceptor';
import { DiscordIdConverter } from '@app/bot/shared/discord-id-converter';
import { RegisterDiscordUserRequest } from './register-discord-user.request';

@UseInterceptors(GuildInterceptor, OwnerInterceptor)
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
        socialAccountId: this.discordIdConverter.toSocialAccountId(user.id),
        provider: 'discord',
        socialId: user.id,
        guildId: this.discordIdConverter.toGuildId(interaction.guildId!),
        memberId: this.discordIdConverter.toMemberId(user.id),
        roleIds: [],
      }),
    );
    interaction.reply(`User registered`);
  }
}
