import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { EMOJI_PROVIDERS } from '@lib/domains/emoji/emoji.providers';
import { EmojiResolver } from './emoji.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [EmojiResolver, ...EMOJI_PROVIDERS],
})
export class EmojiModule {}
