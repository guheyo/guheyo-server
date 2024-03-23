import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VERSION_PROVIDERS } from '@lib/domains/version/version.providers';
import { VersionResolver } from './version.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [VersionResolver, ...VERSION_PROVIDERS],
})
export class VersionModule {}
