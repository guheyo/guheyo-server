import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { MemberRepository } from '../../adapter/out/persistence/member.repository';
import { CreateMemberHandler } from './create-member/create-member.handler';
import { UpdateMemberHandler } from './update-member/update-member.handler';
import { DeleteMemberHandler } from './delete-member/delete-member.handler';

const commandHandlers = [CreateMemberHandler, UpdateMemberHandler, DeleteMemberHandler];

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [
    ...commandHandlers,
    {
      provide: 'MemberSavePort',
      useClass: MemberRepository,
    },
  ],
  exports: [
    ...commandHandlers,
    {
      provide: 'MemberSavePort',
      useClass: MemberRepository,
    },
  ],
})
export class MemberCommandModule {}
