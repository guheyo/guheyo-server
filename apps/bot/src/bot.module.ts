import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigYamlModule } from '@app/bot/config/config.module';
import { NecordModule } from 'necord';
import { ConfigService } from '@nestjs/config/dist';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { USER_PROVIDERS } from '@lib/domains/user/user.providers';
import { NecordConfigService } from './necord/necord.config.service';
import { COMMAND_HANDLERS } from './commands/command-handlers';

@Module({
  imports: [
    CqrsModule,
    ConfigYamlModule,
    PrismaModule,
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
  providers: [...USER_PROVIDERS, ...COMMAND_HANDLERS],
})
export class BotModule {}
