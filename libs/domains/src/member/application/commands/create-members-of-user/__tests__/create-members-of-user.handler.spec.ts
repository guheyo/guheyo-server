import { Test } from '@nestjs/testing';
import { instance, mock, verify } from 'ts-mockito';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { MemberSavePort } from '../../../ports/out/member.save.port';
import { CreateMembersOfUserHandler } from '../create-members-of-user.handler';
import { CreateMembersOfUserCommand } from '../create-members-of-user.command';
import { CreateMembersOfUserInput } from '../create-members-of-user.input';

describe('CreateMembersOfUserHandler', () => {
  let handler: CreateMembersOfUserHandler;
  const memberSavePort: MemberSavePort = mock(MemberRepository);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateMembersOfUserHandler,
        {
          provide: 'MemberSavePort',
          useValue: instance(memberSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<CreateMembersOfUserHandler>(CreateMembersOfUserHandler);
  });

  describe('createMembersOfUser', () => {
    it('should execute create', async () => {
      const input: CreateMembersOfUserInput = {
        userId: '94587c54-4d7d-11ee-be56-0242ac120002',
        guildIdWithRoleIdsList: [],
      };
      const command = new CreateMembersOfUserCommand(input);
      await handler.execute(command);
      verify(memberSavePort.createMembersOfUser(input)).once();
    });
  });
});
