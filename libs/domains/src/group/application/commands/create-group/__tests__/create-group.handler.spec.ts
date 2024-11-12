import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { GroupRepository } from '@lib/domains/group/adapter/out/persistence/group.repository';
import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { CreateGroupCommand } from '../create-group.command';
import { CreateGroupHandler } from '../create-group.handler';
import { GroupSavePort } from '../../../ports/out/group.save.port';

describe('CreateGroupHandler', () => {
  let handler: CreateGroupHandler;
  const groupSavePort: GroupSavePort = mock(GroupRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateGroupHandler,
        {
          provide: 'GroupSavePort',
          useValue: instance(groupSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<CreateGroupHandler>(CreateGroupHandler);
  });

  describe('execute', () => {
    it('should execute create', async () => {
      const command: CreateGroupCommand = {
        categories: [],
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        name: 'guild-name',
        slug: 'group-slug',
        position: 0,
      };
      await handler.execute(command);
      verify(groupSavePort.create(anyOfClass(GroupEntity))).once();
    });
  });
});
