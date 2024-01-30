import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { GroupRepository } from '@lib/domains/group/adapter/out/persistence/group.repository';
import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { DeleteGroupCommand } from '../delete-group.command';
import { DeleteGroupHandler } from '../delete-group.handler';
import { GroupLoadPort } from '../../../ports/out/group.load.port';
import { GroupSavePort } from '../../../ports/out/group.save.port';

describe('DeleteGroupHandler', () => {
  let handler: DeleteGroupHandler;
  const guildLoadPort: GroupLoadPort = mock(GroupRepository);
  const guildSavePort: GroupSavePort = mock(GroupRepository);
  const command: DeleteGroupCommand = {
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
  };
  when(groupLoadPort.findById(command.id)).thenResolve(
    new GroupEntity({
      id: command.id,
    }),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteGroupHandler,
        {
          provide: 'GroupLoadPort',
          useValue: instance(groupLoadPort),
        },
        {
          provide: 'GroupSavePort',
          useValue: instance(groupSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<DeleteGroupHandler>(DeleteGroupHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      await handler.execute(command);
      verify(groupSavePort.delete(anyOfClass(GroupEntity))).once();
    });
  });
});
