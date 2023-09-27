import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ROLE_PROVIDERS } from '@lib/domains/role/role.providers';
import { RoleResolver } from './role.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [RoleResolver, ...ROLE_PROVIDERS],
})
export class RoleModule {}
