import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { PLATFORM_PROVIDERS } from '@lib/domains/platform/platform.providers';
import { PlatformResolver } from './platform.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [PlatformResolver, ...PLATFORM_PROVIDERS],
})
export class PlatformModule {}
