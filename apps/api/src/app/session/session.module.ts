import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { SESSION_PROVIDERS } from '@lib/domains/session/session.providers';
import { SessionResolver } from './session.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [SessionResolver, ...SESSION_PROVIDERS],
})
export class SessionModule {}
