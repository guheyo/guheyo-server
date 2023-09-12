import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { SocialAccountCommandRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.command.repository';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { CreateSocialAccountCommand } from '../create-social-account.command';
import { CreateSocialAccountHandler } from '../create-social-account.handler';

describe('CreateSocialAccountCommand', () => {
  let handler: CreateSocialAccountHandler;
  const savePort: SavePort<SocialAccountEntity> = mock(SocialAccountCommandRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateSocialAccountHandler,
        {
          provide: 'SocialAccountSavePort',
          useValue: instance(savePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<CreateSocialAccountHandler>(CreateSocialAccountHandler);
  });

  describe('execute', () => {
    it('should execute create', async () => {
      const command: CreateSocialAccountCommand = {
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
