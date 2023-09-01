import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserCommandAdapter } from '@lib/domains/user/adapter/out/persistence/user.command.adapter';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserSavePort } from '../../../port/out/user.save.port';
import { UserCreateCommand } from '../user.create.command';
import { UserCreateHandler } from '../user.create.handler';

describe('UserCreateCommand', () => {
  let handler: UserCreateHandler;
  const savePort: UserSavePort = mock(UserCommandAdapter);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserCreateHandler,
        {
          provide: 'UserSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<UserCreateHandler>(UserCreateHandler);
  });

  describe('execute', () => {
    it('should execute create', async () => {
      const command: UserCreateCommand = { username: 'test-user' };
      await handler.execute(command);
      verify(savePort.create(anyOfClass(UserEntity))).once();
    });
  });
});
