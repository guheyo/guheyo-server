import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { MemberRolesSavePort } from '../../../ports/out/member-roles.save.port';
import { ConnectRolesCommand } from '../connect-roles.command';
import { ConnectRolesHandler } from '../connect-roles.handler';
import { MemberLoadPort } from '../../../ports/out/member.load.port';
import { MemberSavePort } from '../../../ports/out/member.save.port';

describe('ConnectRolesHandler', () => {
  let handler: ConnectRolesHandler;
  const memberLoadPort: MemberLoadPort = mock(MemberRepository);
  const memberSavePort: MemberSavePort = mock(MemberRepository);
  const memberRolesSavePort: MemberRolesSavePort = mock(MemberRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConnectRolesHandler,
        {
          provide: 'MemberLoadPort',
          useValue: instance(memberLoadPort),
        },
        {
          provide: 'MemberSavePort',
          useValue: instance(memberSavePort),
        },
        {
          provide: 'MemberRolesSavePort',
          useValue: instance(memberRolesSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<ConnectRolesHandler>(ConnectRolesHandler);
  });

  describe('execute', () => {
    it('should execute find', async () => {
      const command: ConnectRolesCommand = {
        groupId: '94587c54-4d7d-11ee-be56-0242ac120002',
        userId: '94587c54-4d7d-11ee-be56-0242ac120003',
        roleIds: ['role-id'],
        roleNames: [],
      };
      await handler.execute(command);
      verify(memberLoadPort.find(command.groupId, command.userId)).once();
    });
  });
});
