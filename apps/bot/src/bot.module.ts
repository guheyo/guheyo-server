import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigYamlModule } from '@app/bot/config/config.module';
import { NecordModule } from 'necord';
import { ConfigService } from '@nestjs/config/dist';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ImageModule } from '@lib/shared/image/image.module';
import { GROUP_PROVIDERS } from '@lib/domains/group/group.providers';
import { USER_PROVIDERS } from '@lib/domains/user/user.providers';
import { USER_IMAGE_PROVIDERS } from '@lib/domains/user-image/user-image.providers';
import { SOCIAL_ACCOUNT_PROVIDERS } from '@lib/domains/social-account/social-account.providers';
import { MEMBER_PROVIDERS } from '@lib/domains/member/member.providers';
import { ROLE_PROVIDERS } from '@lib/domains/role/role.providers';
import { OFFER_PROVIDERS } from '@lib/domains/offer/offer.providers';
import { DEMAND_PROVIDERS } from '@lib/domains/demand/demand.providers';
import { SWAP_PROVIDERS } from '@lib/domains/swap/swap.providers';
import { APP_FILTER } from '@nestjs/core';
import { NecordConfigService } from './necord/necord.config.service';
import { COMMAND_HANDLERS } from './commands/command-handlers';
import { EVENT_HANDLERS } from './events/event-handlers';
import { DiscordIdConverter } from './shared/converters/discord-id-converter';
import { BotExceptionFilter } from './filters/bot-exception.filter';
import { BOT_PROVIDERS } from './apps/bot.providers';
import { DiscordConfigService } from './shared/discord/discord.config.service';

@Module({
  imports: [
    CqrsModule,
    ConfigYamlModule,
    PrismaModule,
    ImageModule,
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
    ...GROUP_PROVIDERS,
    ...USER_PROVIDERS,
    ...USER_IMAGE_PROVIDERS,
    ...SOCIAL_ACCOUNT_PROVIDERS,
    ...MEMBER_PROVIDERS,
    ...ROLE_PROVIDERS,
    ...OFFER_PROVIDERS,
    ...SWAP_PROVIDERS,
    ...DEMAND_PROVIDERS,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
    DiscordConfigService,
    DiscordIdConverter,
    {
      provide: APP_FILTER,
      useClass: BotExceptionFilter,
    },
    ...BOT_PROVIDERS,
  ],
})
export class BotModule {}
