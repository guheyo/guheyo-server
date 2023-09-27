import { Injectable, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { v5 as uuid5 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { CreateJoinedUserCommand } from '@lib/domains/user/application/commands/create-joined-user/create-joined-user.command';
import { GuildSlashCommandGuard } from '@app/bot/guards/guild.slash-command.guard';
import { OwnerSlashCommandGuard } from '@app/bot/guards/owner.slash-command.guard';
import { RegisterUserRequest } from './register-user.request';

@UseGuards(GuildSlashCommandGuard)
@UseGuards(OwnerSlashCommandGuard)
@Injectable()
export class RegisterUserSlashCommandHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly configService: ConfigService,
  ) {}

  @SlashCommand({ name: 'register-user', description: 'Register user in DB' })
  public async onCreateUser(
    @Context() [interaction]: SlashCommandContext,
    @Options() { user }: RegisterUserRequest,
  ) {
    this.commandBus.execute(
      new CreateJoinedUserCommand({
        username: user.username,
        avatarURL: user.avatarURL() || undefined,
        socialAccountId: uuid5(user.id, this.configService.get('namespace.discord')!),
        provider: 'discord',
        socialId: user.id,
        guildId: uuid5(interaction.guildId!, this.configService.get('namespace.discord')!),
        memberId: uuid5(user.id, this.configService.get('namespace.guild')!),
        roleIds: [],
      }),
    );
    interaction.reply(`User registered`);
  }
}
