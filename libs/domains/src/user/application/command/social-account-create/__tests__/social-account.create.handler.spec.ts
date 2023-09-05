import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { SocialAccountSavePort } from '../../../port/out/social-account.save.port';
import { SocialAccountCreateCommand } from '../social-account.create.command';
import { SocialAccountCreateHandler } from '../social-account.create.handler';

describe('SocialAccountCreateCommand', () => {
  let handler: SocialAccountCreateHandler;
  const savePort: SocialAccountSavePort = mock(UserCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SocialAccountCreateHandler,
        {
          provide: 'SocialAccountSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<SocialAccountCreateHandler>(SocialAccountCreateHandler);
  });

  describe('execute', () => {
    it('should execute create', async () => {
      const command: SocialAccountCreateCommand = {
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
      verify(savePort.createSocialAccount(anyOfClass(SocialAccountEntity))).once();
    });
  });
});
