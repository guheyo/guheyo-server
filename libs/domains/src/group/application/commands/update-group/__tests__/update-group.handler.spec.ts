import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { GroupRepository } from '@lib/domains/group/adapter/out/persistence/group.repository';
import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { UpdateGroupCommand } from '../update-group.command';
import { UpdateGroupHandler } from '../update-group.handler';
import { GroupLoadPort } from '../../../ports/out/group.load.port';
import { GroupSavePort } from '../../../ports/out/group.save.port';

describe('UpdateGroupHandler', () => {
  let handler: UpdateGroupHandler;
  const groupLoadPort: GroupLoadPort = mock(GroupRepository);
  const roleSavePort: GroupSavePort = mock(GroupRepository);
  const command: UpdateGroupCommand = {
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
    name: 'role-name',
    position: 0,
  };
  when(groupLoadPort.findById(command.id)).thenResolve(new GroupEntity(command));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateGroupHandler,
        {
          provide: 'GroupLoadPort',
          useValue: instance(groupLoadPort),
        },
        {
          provide: 'GroupSavePort',
          useValue: instance(roleSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<UpdateGroupHandler>(UpdateGroupHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      await handler.execute(command);
      verify(roleSavePort.save(anyOfClass(GroupEntity))).once();
    });
  });
});
