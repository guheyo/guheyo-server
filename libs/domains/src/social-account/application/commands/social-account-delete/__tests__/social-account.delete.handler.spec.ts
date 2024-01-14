import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { SocialAccountCommandRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.command.repository';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountDeleteCommand } from '../social-account.delete.command';
import { SocialAccountDeleteHandler } from '../social-account.delete.handler';

describe('SocialAccountDeleteCommand', () => {
  let handler: SocialAccountDeleteHandler;
  const savePort: SavePort<SocialAccountEntity> = mock(SocialAccountCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SocialAccountDeleteHandler,
        {
          provide: 'SocialAccountSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<SocialAccountDeleteHandler>(SocialAccountDeleteHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      const command: SocialAccountDeleteCommand = {
        id: 'test-id',
      };
      await handler.execute(command);
      verify(savePort.delete(anyOfClass(SocialAccountEntity))).once();
    });
  });
});
