import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { GUILD_PROVIDERS } from '@lib/domains/guild/guild.providers';
import { GuildResolver } from './guild.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [GuildResolver, ...GUILD_PROVIDERS],
})
export class GuildModule {}
