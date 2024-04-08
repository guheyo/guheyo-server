import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { MANNER_TAG_PROVIDERS } from '@lib/domains/manner-tag/manner-tag.providers';
import { MannerTagResolver } from './manner-tag.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [MannerTagResolver, ...MANNER_TAG_PROVIDERS],
})
export class MannerTagModule {}
