import { Module } from '@nestjs/common';
import { ConfigYamlModule } from '@app/bot/config/config.module';
import { NecordModule } from 'necord';
import { ConfigService } from '@nestjs/config/dist';
import { NecordConfigService } from './necord/necord.config.service';
import { EVENT_HANDLERS } from './events/event-handlers';
import { COMMAND_HANDLERS } from './commands/command-handlers';

@Module({
  imports: [
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
  ],
  providers: [...EVENT_HANDLERS, ...COMMAND_HANDLERS],
})
export class BotModule {}
