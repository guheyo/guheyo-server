import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { CreateMemberCommand } from '../create-member.command';
import { CreateMemberHandler } from '../create-member.handler';

describe('CreateMemberHandler', () => {
  let handler: CreateMemberHandler;
  const savePort: SavePort<MemberEntity> = mock(MemberRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateMemberHandler,
        {
          provide: 'MemberSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<CreateMemberHandler>(CreateMemberHandler);
  });

  describe('execute', () => {
    it('should execute create', async () => {
      const command: CreateMemberCommand = {
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        userId: 'user-id',
        guildId: 'guild-id',
      };
      await handler.execute(command);
      verify(savePort.create(anyOfClass(MemberEntity))).once();
    });
  });
});
