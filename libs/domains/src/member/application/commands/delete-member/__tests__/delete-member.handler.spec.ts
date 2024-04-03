import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { DeleteMemberCommand } from '../delete-member.command';
import { DeleteMemberHandler } from '../delete-member.handler';
import { MemberSavePort } from '../../../ports/out/member.save.port';
import { MemberLoadPort } from '../../../ports/out/member.load.port';

describe('DeleteMemberHandler', () => {
  let handler: DeleteMemberHandler;
  const memberSavePort: MemberSavePort = mock(MemberRepository);
  const memberLoadPort: MemberLoadPort = mock(MemberRepository);
  const command: DeleteMemberCommand = {
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
    userId: 'user-id',
  };
  when(memberLoadPort.findById(command.id)).thenResolve(
    new MemberEntity({
      id: command.id,
    }),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteMemberHandler,
        {
          provide: 'MemberSavePort',
          useValue: instance(memberSavePort),
        },
        {
          provide: 'MemberLoadPort',
          useValue: instance(memberLoadPort),
        },
      ],
    }).compile();

    handler = moduleRef.get<DeleteMemberHandler>(DeleteMemberHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      await handler.execute(command);
      verify(memberSavePort.delete(anyOfClass(MemberEntity))).once();
    });
  });
});
