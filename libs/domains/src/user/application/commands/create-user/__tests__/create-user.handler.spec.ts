import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { CreateUserCommand } from '../create-user.command';
import { CreateUserHandler } from '../create-user.handler';
import { UserSavePort } from '../../../ports/out/user.save.port';

describe('CreateUserCommand', () => {
  let handler: CreateUserHandler;
  const userSavePort: UserSavePort = mock(UserRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateUserHandler,
        {
          provide: 'UserSavePort',
          useValue: instance(userSavePort),
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
      verify(userSavePort.create(anyOfClass(UserEntity))).once();
    });
  });
});
