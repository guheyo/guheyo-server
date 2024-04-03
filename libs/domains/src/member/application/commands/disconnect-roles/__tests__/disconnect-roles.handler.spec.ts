import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { MemberRolesSavePort } from '../../../ports/out/member-roles.save.port';
import { DisconnectRolesCommand } from '../disconnect-roles.command';
import { DisconnectRolesHandler } from '../disconnect-roles.handler';

describe('DisconnectRolesHandler', () => {
  let handler: DisconnectRolesHandler;
  const savePort: MemberRolesSavePort = mock(MemberRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DisconnectRolesHandler,
        {
          provide: 'MemberRolesSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<DisconnectRolesHandler>(DisconnectRolesHandler);
  });

  describe('execute', () => {
    it('should execute disconnectRoles', async () => {
      const command: DisconnectRolesCommand = {
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        roleIds: ['role-id'],
        roleNames: [],
      };
      await handler.execute(command);
      verify(savePort.disconnectRoles(command.id, command.roleIds, command.roleNames)).once();
    });
  });
});
