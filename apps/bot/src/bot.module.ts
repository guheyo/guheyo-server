import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigYamlModule } from '@app/bot/config/config.module';
import { NecordModule } from 'necord';
import { ConfigService } from '@nestjs/config/dist';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { USER_PROVIDERS } from '@lib/domains/user/user.providers';
import { SOCIAL_ACCOUNT_PROVIDERS } from '@lib/domains/social-account/social-account.providers';
import { MEMBER_PROVIDERS } from '@lib/domains/member/member.providers';
import { NecordConfigService } from './necord/necord.config.service';
import { COMMAND_HANDLERS } from './commands/command-handlers';
import { EVENT_HANDLERS } from './events/event-handlers';

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
  providers: [
    ...USER_PROVIDERS,
    ...SOCIAL_ACCOUNT_PROVIDERS,
    ...MEMBER_PROVIDERS,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
  ],
})
export class BotModule {}
