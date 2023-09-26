import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { RoleRepository } from '@lib/domains/role/adapter/out/persistence/role.repository';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { CreateRoleCommand } from '../create-role.command';
import { CreateRoleHandler } from '../create-role.handler';
import { RoleSavePort } from '../../../ports/out/role.save.port';

describe('CreateRoleHandler', () => {
  let handler: CreateRoleHandler;
  const roleSavePort: RoleSavePort = mock(RoleRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateRoleHandler,
        {
          provide: 'RoleSavePort',
          useValue: instance(roleSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<CreateRoleHandler>(CreateRoleHandler);
  });

  describe('execute', () => {
    it('should execute create', async () => {
      const command: CreateRoleCommand = {
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        name: 'role-name',
        rank: 0,
        hexColor: '#000000',
        guildId: 'guild-id',
      };
      await handler.execute(command);
      verify(roleSavePort.create(anyOfClass(RoleEntity))).once();
    });
  });
});
