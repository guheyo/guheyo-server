import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UpdateUserCommand } from '../update-user.command';
import { UpdateUserHandler } from '../update-user.handler';
import { UserSavePort } from '../../../ports/out/user.save.port';
import { UserLoadPort } from '../../../ports/out/user.load.port';

describe('UpdateUserCommand', () => {
  let handler: UpdateUserHandler;
  const userSavePort: UserSavePort = mock(UserRepository);
  const userLoadPort: UserLoadPort = mock(UserRepository);
  const command = new UpdateUserCommand({
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
    avatarURL: 'changed-avatar-url',
  });
  when(userLoadPort.findById(command.id)).thenResolve(
    new UserEntity({
      id: command.id,
    }),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateUserHandler,
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
    handler = moduleRef.get<UpdateUserHandler>(UpdateUserHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      await handler.execute(command);
      verify(userSavePort.save(anyOfClass(UserEntity))).once();
    });
  });
});
