import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigYamlModule } from '@app/bot/config/config.module';
import { NecordModule } from 'necord';
import { ConfigService } from '@nestjs/config/dist';
import { UserCommandModule } from '@lib/domains/user/application/commands/user.command.module';
import { UserEventModule } from '@lib/domains/user/application/events/user.event.module';
import { UserSagaModule } from '@lib/domains/user/application/sagas/user.saga.module';
import { NecordConfigService } from './necord/necord.config.service';
import { EVENT_HANDLERS } from './events/event-handlers';
import { COMMAND_HANDLERS } from './commands/command-handlers';

@Module({
  imports: [
    CqrsModule,
    ConfigYamlModule,
    NecordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get('discord.bot.token')!,
        intents: [
          'Guilds',
          'GuildMembers',
          'GuildMessages',
          'GuildMessageReactions',
          'MessageContent',
        ],
      }),
      inject: [ConfigService],
      useClass: NecordConfigService,
    }),
    UserCommandModule,
    UserEventModule,
    UserSagaModule,
  ],
  providers: [...EVENT_HANDLERS, ...COMMAND_HANDLERS],
})
export class BotModule {}
