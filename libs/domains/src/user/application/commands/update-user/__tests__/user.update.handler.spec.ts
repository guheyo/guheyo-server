import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UpdateUserCommand } from '../update-user.command';
import { UpdateUserHandler } from '../update-user.handler';

describe('UpdateUserCommand', () => {
  let handler: UpdateUserHandler;
  const savePort: SavePort<UserEntity> = mock(UserCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateUserHandler,
        {
          provide: 'UserSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();
    handler = moduleRef.get<UpdateUserHandler>(UpdateUserHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      const command = new UpdateUserCommand({
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        name: 'changed-name',
      });
      await handler.execute(command);
      verify(savePort.update(anyOfClass(UserEntity))).once();
    });
  });
});
