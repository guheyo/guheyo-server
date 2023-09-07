import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { SocialAccountSavePort } from '../../../port/out/social-account.save.port';
import { SocialAccountUpdateCommand } from '../social-account.update.command';
import { SocialAccountUpdateHandler } from '../social-account.update.handler';

describe('SocialAccountUpdateCommand', () => {
  let handler: SocialAccountUpdateHandler;
  const savePort: SocialAccountSavePort = mock(UserCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SocialAccountUpdateHandler,
        {
          provide: 'SocialAccountSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<SocialAccountUpdateHandler>(SocialAccountUpdateHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      const command: SocialAccountUpdateCommand = {
        provider: 'discord',
        socialId: 'social-id',
        userId: 'user-id',
        refreshToken: 'refresh-token',
        accessToken: 'access-token',
        expiresAt: 1234,
        tokenType: 'token-type',
        scope: 'scope',
        idToken: 'id-token',
        sessionState: 'session-state',
      };
      await handler.execute(command);
      verify(savePort.updateSocialAccount(anyOfClass(SocialAccountEntity))).once();
    });
  });
});
