import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { THREAD_PROVIDERS } from '@lib/domains/thread/thread.providers';
import { ThreadResolver } from './thread.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [ThreadResolver, ...THREAD_PROVIDERS],
})
export class ThreadModule {}
