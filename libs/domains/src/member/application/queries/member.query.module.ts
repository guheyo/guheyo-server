import { Module } from '@nestjs/common';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { MemberQueryRepository } from '../../adapter/out/persistence/member.query.repository';
import { FindMemberByUserAndGuildHandler } from './find-member-by-user-and-guild/find-member-by-user-and-guild.handler';

const queryHandlers = [FindMemberByUserAndGuildHandler];

@Module({
  imports: [PrismaModule],
  providers: [
    ...queryHandlers,
    {
      provide: 'MemberLoadPort',
      useClass: MemberQueryRepository,
    },
  ],
  exports: [
    ...queryHandlers,
    {
      provide: 'MemberLoadPort',
      useClass: MemberQueryRepository,
    },
  ],
})
export class MemberQueryModule {}
