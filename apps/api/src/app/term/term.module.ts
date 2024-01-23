import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TERM_PROVIDERS } from '@lib/domains/term/term.providers';
import { TermResolver } from './term.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [TermResolver, ...TERM_PROVIDERS],
})
export class TermModule {}
