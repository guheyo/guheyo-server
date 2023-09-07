import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserSavePort } from '../../../port/out/user.save.port';
import { UserUpdateCommand } from '../user.update.command';
import { UserUpdateHandler } from '../user.update.handler';

describe('UserUpdateCommand', () => {
  let handler: UserUpdateHandler;
  const savePort: UserSavePort = mock(UserCommandRepository);

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
      const command = new UserUpdateCommand({
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        name: 'changed-name',
      });
      await handler.execute(command);
      verify(savePort.update(anyOfClass(UserEntity))).once();
    });
  });
});
