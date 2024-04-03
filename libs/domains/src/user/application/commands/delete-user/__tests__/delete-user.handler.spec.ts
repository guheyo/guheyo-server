import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { DeleteUserCommand } from '../delete-user.command';
import { DeleteUserHandler } from '../delete-user.handler';
import { UserSavePort } from '../../../ports/out/user.save.port';
import { UserLoadPort } from '../../../ports/out/user.load.port';

describe('DeleteUserCommand', () => {
  let handler: DeleteUserHandler;
  const userSavePort: UserSavePort = mock(UserRepository);
  const userLoadPort: UserLoadPort = mock(UserRepository);
  const command: DeleteUserCommand = new DeleteUserCommand('94587c54-4d7d-11ee-be56-0242ac120002');
  when(userLoadPort.findById(command.id)).thenResolve(
    new UserEntity({
      id: command.id,
    }),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteUserHandler,
        {
          provide: 'UserSavePort',
          useValue: instance(userSavePort),
        },
        {
          provide: 'UserLoadPort',
          useValue: instance(userLoadPort),
        },
      ],
    }).compile();
    handler = moduleRef.get<DeleteUserHandler>(DeleteUserHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      await handler.execute(command);
      verify(userSavePort.delete(anyOfClass(UserEntity))).once();
    });
  });
});
