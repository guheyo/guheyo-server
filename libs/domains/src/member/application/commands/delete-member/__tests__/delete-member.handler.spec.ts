import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { DeleteMemberCommand } from '../delete-member.command';
import { DeleteMemberHandler } from '../delete-member.handler';

describe('DeleteMemberHandler', () => {
  let handler: DeleteMemberHandler;
  const savePort: SavePort<MemberEntity> = mock(MemberRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteMemberHandler,
        {
          provide: 'MemberSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<DeleteMemberHandler>(DeleteMemberHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      const command: DeleteMemberCommand = {
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        userId: 'user-id',
      };
      await handler.execute(command);
      verify(savePort.delete(anyOfClass(MemberEntity))).once();
    });
  });
});
