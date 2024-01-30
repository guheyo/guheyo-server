import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { GROUP_PROVIDERS } from '@lib/domains/group/group.providers';
import { GroupResolver } from './group.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [GroupResolver, ...GROUP_PROVIDERS],
})
export class GroupModule {}
