import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { SocialAccountRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.repository';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { UpdateSocialAccountCommand } from '../update-social-account.command';
import { UpdateSocialAccountHandler } from '../update-social-account.handler';
import { SocialAccountSavePort } from '../../../ports/out/social-account.save.port';
import { SocialAccountLoadPort } from '../../../ports/out/social-account.load.port';

describe('UpdateSocialAccountCommand', () => {
  let handler: UpdateSocialAccountHandler;
  const socialAccountSavePort: SocialAccountSavePort = mock(SocialAccountRepository);
  const socialAccountLoadPort: SocialAccountLoadPort = mock(SocialAccountRepository);
  const command: UpdateSocialAccountCommand = {
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
    userId: '94587c54-4d7d-11ee-be56-0242ac120002',
    refreshToken: 'refresh-token',
    accessToken: 'access-token',
    expiresAt: 1234,
    tokenType: 'token-type',
    scope: 'scope',
    idToken: 'id-token',
    sessionState: 'session-state',
  };
  when(socialAccountLoadPort.findById(command.id)).thenResolve(
    new SocialAccountEntity({
      id: command.id,
    }),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateSocialAccountHandler,
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

    handler = moduleRef.get<UpdateSocialAccountHandler>(UpdateSocialAccountHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      await handler.execute(command);
      verify(socialAccountSavePort.save(anyOfClass(SocialAccountEntity))).once();
    });
  });
});
