import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { RoleRepository } from '@lib/domains/role/adapter/out/persistence/role.repository';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { UpdateRoleCommand } from '../update-role.command';
import { UpdateRoleHandler } from '../update-role.handler';
import { RoleLoadPort } from '../../../ports/out/role.load.port';
import { RoleSavePort } from '../../../ports/out/role.save.port';

describe('UpdateRoleHandler', () => {
  let handler: UpdateRoleHandler;
  const roleLoadPort: RoleLoadPort = mock(RoleRepository);
  const roleSavePort: RoleSavePort = mock(RoleRepository);
  const command: UpdateRoleCommand = {
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
    name: 'role-name',
    position: 0,
    hexColor: '#000000',
  };
  when(roleLoadPort.findById(command.id)).thenResolve(new RoleEntity(command));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateRoleHandler,
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

    handler = moduleRef.get<UpdateRoleHandler>(UpdateRoleHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      await handler.execute(command);
      verify(roleSavePort.save(anyOfClass(RoleEntity))).once();
    });
  });
});
