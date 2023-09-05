import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { UserSavePort } from '../../../port/out/user.save.port';
import { UserDeleteCommand } from '../user.delete.command';
import { UserDeleteHandler } from '../user.delete.handler';

describe('UserDeleteCommand', () => {
  let handler: UserDeleteHandler;
  const savePort: UserSavePort = mock(UserCommandRepository);

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
      const command: UserDeleteCommand = { id: '1' };
      await handler.execute(command);
      verify(savePort.delete(command.id)).once();
    });
  });
});
