import { Test } from '@nestjs/testing';
import { mock, verify, instance, anything } from 'ts-mockito';
import { RoleRepository } from '@lib/domains/role/adapter/out/persistence/role.repository';
import { UpsertRolesCommand } from '../upsert-roles.command';
import { RoleSavePort } from '../../../ports/out/role.save.port';
import { UpsertRolesHandler } from '../upsert-roles.handler';

describe('UpsertRolesHandler', () => {
  let handler: UpsertRolesHandler;
  const roleSavePort: RoleSavePort = mock(RoleRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpsertRolesHandler,
        {
          provide: 'RoleSavePort',
          useValue: instance(roleSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<UpsertRolesHandler>(UpsertRolesHandler);
  });

  describe('execute', () => {
    it('should execute upsert', async () => {
      const command: UpsertRolesCommand = {
        upsertRoleInputs: [
          {
            id: '94587c54-4d7d-11ee-be56-0242ac120002',
            name: 'role-name',
            position: 0,
            hexColor: '#000000',
            groupId: 'guild-id',
          },
        ],
      };
      await handler.execute(command);
      verify(roleSavePort.upsertRoles(anything())).once();
    });
  });
});
