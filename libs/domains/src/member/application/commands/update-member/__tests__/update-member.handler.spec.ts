import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { MemberCommandRepository } from '@lib/domains/member/adapter/out/persistence/member.command.repository';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UpdateMemberCommand } from '../update-member.command';
import { UpdateMemberHandler } from '../update-member.handler';

describe('UpdateMemberHandler', () => {
  let handler: UpdateMemberHandler;
  const savePort: SavePort<MemberEntity> = mock(MemberCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateMemberHandler,
        {
          provide: 'MemberSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<UpdateMemberHandler>(UpdateMemberHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      const command: UpdateMemberCommand = {
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        userId: 'user-id',
      };
      await handler.execute(command);
      verify(savePort.update(anyOfClass(MemberEntity))).once();
    });
  });
});
