import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserCommandAdapter } from '@lib/domains/user/adapter/out/persistence/user.command.adapter';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserSavePort } from '../../../port/out/user.save.port';
import { UserUpdateCommand } from '../user.update.command';
import { UserUpdateHandler } from '../user.update.handler';

describe('UserUpdateCommand', () => {
  let handler: UserUpdateHandler;
  const savePort: UserSavePort = mock(UserCommandAdapter);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserUpdateHandler,
        {
          provide: 'UserSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();
    handler = moduleRef.get<UserUpdateHandler>(UserUpdateHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      const command: UserUpdateCommand = { name: 'changed-name' };
      await handler.execute(command);
      verify(savePort.update(anyOfClass(UserEntity))).once();
    });
  });
});
