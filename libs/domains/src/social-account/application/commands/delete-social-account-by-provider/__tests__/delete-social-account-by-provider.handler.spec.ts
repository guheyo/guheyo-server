import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { SocialAccountRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.repository';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { DeleteSocialAccountByProviderCommand } from '../delete-social-account-by-provider.command';
import { DeleteSocialAccountHandler } from '../delete-social-account-by-provider.handler';
import { SocialAccountSavePort } from '../../../ports/out/social-account.save.port';
import { SocialAccountLoadPort } from '../../../ports/out/social-account.load.port';

describe('DeleteSocialAccountByProviderCommand', () => {
  let handler: DeleteSocialAccountHandler;
  const socialAccountSavePort: SocialAccountSavePort = mock(SocialAccountRepository);
  const socialAccountLoadPort: SocialAccountLoadPort = mock(SocialAccountRepository);
  const command: DeleteSocialAccountByProviderCommand = {
    provider: 'discord',
    socialId: '1234',
  };
  when(socialAccountLoadPort.findByProvider(command.provider, command.socialId)).thenResolve(
    new SocialAccountEntity({
      id: 'test-id',
    }),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteSocialAccountHandler,
        {
          provide: 'SocialAccountSavePort',
          useValue: instance(socialAccountSavePort),
        },
        {
          provide: 'SocialAccountLoadPort',
          useValue: instance(socialAccountLoadPort),
        },
      ],
    }).compile();

    handler = moduleRef.get<DeleteSocialAccountHandler>(DeleteSocialAccountHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      await handler.execute(command);
      verify(socialAccountSavePort.delete(anyOfClass(SocialAccountEntity))).once();
    });
  });
});
