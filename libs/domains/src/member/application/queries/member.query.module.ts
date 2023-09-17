import { Module } from '@nestjs/common';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { PrismaService } from '@lib/shared';
import { FindMemberByUserAndGuildHandler } from './find-member-by-user-and-guild/find-member-by-user-and-guild.handler';

const queryHandlers = [FindMemberByUserAndGuildHandler];

@Module({
  imports: [PrismaModule],
  providers: [...queryHandlers, PrismaService],
  exports: [...queryHandlers, PrismaService],
})
export class MemberQueryModule {}
