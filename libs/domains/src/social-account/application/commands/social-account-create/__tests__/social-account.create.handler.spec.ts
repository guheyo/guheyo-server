import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { SocialAccountCommandRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.command.repository';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountSavePort } from '@lib/domains/social-account/port/out/social-account.save.port';
import { SocialAccountCreateCommand } from '../social-account.create.command';
import { SocialAccountCreateHandler } from '../social-account.create.handler';

describe('SocialAccountCreateCommand', () => {
  let handler: SocialAccountCreateHandler;
  const savePort: SocialAccountSavePort = mock(SocialAccountCommandRepository);

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
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
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
      verify(savePort.create(anyOfClass(SocialAccountEntity))).once();
    });
  });
});
