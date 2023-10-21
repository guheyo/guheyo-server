import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NecordModule } from 'necord';
import { ConfigService } from '@nestjs/config';
import { NecordConfigService } from '@app/bot/necord/necord.config.service';
import { DISCORD_MESSAGE_PROVIDERS } from '@lib/domains/discord-message/discord-message.providers';
import { DiscordMessageResolver } from './discord-message.resolver';

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    NecordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get('discord.bot.token')!,
        intents: ['Guilds', 'GuildMessages', 'GuildMessageReactions', 'MessageContent'],
      }),
      inject: [ConfigService],
      useClass: NecordConfigService,
    }),
  ],
  providers: [DiscordMessageResolver, ...DISCORD_MESSAGE_PROVIDERS],
})
export class DiscordMessageModule {}
