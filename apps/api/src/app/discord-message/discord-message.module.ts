import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DISCORD_MESSAGE_PROVIDERS } from '@lib/domains/discord-message/discord-message.providers';
import { DiscordMessageResolver } from './discord-message.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [DiscordMessageResolver, ...DISCORD_MESSAGE_PROVIDERS],
})
export class DiscordMessageModule {}
