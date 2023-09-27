import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { RoleRepository } from '@lib/domains/role/adapter/out/persistence/role.repository';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { DeleteRoleCommand } from '../delete-role.command';
import { DeleteRoleHandler } from '../delete-role.handler';
import { RoleSavePort } from '../../../ports/out/role.save.port';
import { RoleLoadPort } from '../../../ports/out/role.load.port';

describe('DeleteMemberHandler', () => {
  let handler: DeleteRoleHandler;
  const roleLoadPort: RoleLoadPort = mock(RoleRepository);
  const roleSavePort: RoleSavePort = mock(RoleRepository);
  const command: DeleteRoleCommand = {
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
  };
  when(roleLoadPort.findById(command.id)).thenResolve(
    new RoleEntity({
      id: command.id,
    }),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteRoleHandler,
        {
          provide: 'RoleLoadPort',
          useValue: instance(roleLoadPort),
        },
        {
          provide: 'RoleSavePort',
          useValue: instance(roleSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<DeleteRoleHandler>(DeleteRoleHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      await handler.execute(command);
      verify(roleSavePort.delete(anyOfClass(RoleEntity))).once();
    });
  });
});
