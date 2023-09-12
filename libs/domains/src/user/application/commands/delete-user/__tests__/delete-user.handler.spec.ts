import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { DeleteUserCommand } from '../delete-user.command';
import { DeleteUserHandler } from '../delete-user.handler';

describe('DeleteUserCommand', () => {
  let handler: DeleteUserHandler;
  const savePort: SavePort<UserEntity> = mock(UserCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteUserHandler,
        {
          provide: 'UserSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();
    handler = moduleRef.get<DeleteUserHandler>(DeleteUserHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      const command: DeleteUserCommand = new DeleteUserCommand({
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
      });
      await handler.execute(command);
      verify(savePort.delete(anyOfClass(UserEntity))).once();
    });
  });
});
