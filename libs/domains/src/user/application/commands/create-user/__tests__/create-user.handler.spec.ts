import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { CreateUserCommand } from '../create-user.command';
import { CreateUserHandler } from '../create-user.handler';

describe('CreateUserCommand', () => {
  let handler: CreateUserHandler;
  const savePort: SavePort<UserEntity> = mock(UserRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: 'UserSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<CreateUserHandler>(CreateUserHandler);
  });

  describe('execute', () => {
    it('should execute create', async () => {
      const command = new CreateUserCommand({
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        username: 'test-user',
      });
      await handler.execute(command);
      verify(savePort.create(anyOfClass(UserEntity))).once();
    });
  });
});
