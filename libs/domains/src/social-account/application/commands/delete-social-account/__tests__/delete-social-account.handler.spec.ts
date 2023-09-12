import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { SocialAccountCommandRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.command.repository';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { DeleteSocialAccountCommand } from '../delete-social-account.command';
import { DeleteSocialAccountHandler } from '../delete-social-account.handler';

describe('DeleteSocialAccountCommand', () => {
  let handler: DeleteSocialAccountHandler;
  const savePort: SavePort<SocialAccountEntity> = mock(SocialAccountCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteSocialAccountHandler,
        {
          provide: 'SocialAccountSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<DeleteSocialAccountHandler>(DeleteSocialAccountHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      const command: DeleteSocialAccountCommand = {
        id: 'test-id',
      };
      await handler.execute(command);
      verify(savePort.delete(anyOfClass(SocialAccountEntity))).once();
    });
  });
});
