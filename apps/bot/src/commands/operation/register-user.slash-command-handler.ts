import { Injectable, UseGuards } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { v4 as uuid4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { UserjoinedEvent } from '@lib/domains/user/application/events/user-joined/user-joined.event';
import { GuildSlashCommandGuard } from '@app/bot/guards/guild.slash-command.guard';
import { OwnerSlashCommandGuard } from '@app/bot/guards/owner.slash-command.guard';
import { RegisterUserRequest } from './register-user.request';

@UseGuards(GuildSlashCommandGuard)
@UseGuards(OwnerSlashCommandGuard)
@Injectable()
export class RegisterUserSlashCommandHandler {
  constructor(
    private readonly eventBus: EventBus,
    private readonly configService: ConfigService,
  ) {}

  @SlashCommand({ name: 'register-user', description: 'Register user in DB' })
  public async onCreateUser(
    @Context() [interaction]: SlashCommandContext,
    @Options() { user }: RegisterUserRequest,
  ) {
    this.eventBus.publish(
      new UserjoinedEvent({
        userId: uuid4(),
        username: user.username,
        socialAccountId: uuid4(),
        provider: 'discord',
        socialId: user.id,
        guildId: this.configService.get('discord.guild.id')!,
        memberId: uuid4(),
        roleIds: [],
      }),
    );
    interaction.reply(`User registered`);
  }
}
