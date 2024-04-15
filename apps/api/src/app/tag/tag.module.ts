import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { TAG_PROVIDERS } from '@lib/domains/tag/tag.providers';
import { TagResolver } from './tag.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [TagResolver, ...TAG_PROVIDERS],
})
export class TagModule {}
