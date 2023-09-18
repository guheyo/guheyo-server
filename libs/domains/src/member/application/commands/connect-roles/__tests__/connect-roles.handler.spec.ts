import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { MemberRolesSavePort } from '../../../port/out/member-roles.save';
import { ConnectRolesCommand } from '../connect-roles.command';
import { ConnectRolesHandler } from '../connect-roles.handler';

describe('ConnectRolesHandler', () => {
  let handler: ConnectRolesHandler;
  const savePort: MemberRolesSavePort = mock(MemberRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConnectRolesHandler,
        {
          provide: 'MemberRolesSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<ConnectRolesHandler>(ConnectRolesHandler);
  });

  describe('execute', () => {
    it('should execute connectRoles', async () => {
      const command: ConnectRolesCommand = {
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        roleIds: ['role-id'],
      };
      await handler.execute(command);
      verify(savePort.connectRoles(command.id, command.roleIds)).once();
    });
  });
});
