import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserDeleteCommand } from '../user.delete.command';
import { UserDeleteHandler } from '../user.delete.handler';

describe('UserDeleteCommand', () => {
  let handler: UserDeleteHandler;
  const savePort: SavePort<UserEntity> = mock(UserCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserDeleteHandler,
        {
          provide: 'UserSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();
    handler = moduleRef.get<UserDeleteHandler>(UserDeleteHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      const command: UserDeleteCommand = new UserDeleteCommand({
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
      });
      await handler.execute(command);
      verify(savePort.delete(anyOfClass(UserEntity))).once();
    });
  });
});
