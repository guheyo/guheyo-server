import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { UpdateMemberCommand } from '../update-member.command';
import { UpdateMemberHandler } from '../update-member.handler';
import { MemberSavePort } from '../../../ports/out/member.save.port';
import { MemberLoadPort } from '../../../ports/out/member.load.port';

describe('UpdateMemberHandler', () => {
  let handler: UpdateMemberHandler;
  const memberSavePort: MemberSavePort = mock(MemberRepository);
  const memberLoadPort: MemberLoadPort = mock(MemberRepository);
  const command: UpdateMemberCommand = {
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
        UpdateMemberHandler,
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

    handler = moduleRef.get<UpdateMemberHandler>(UpdateMemberHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      await handler.execute(command);
      verify(memberSavePort.save(anyOfClass(MemberEntity))).once();
    });
  });
});
