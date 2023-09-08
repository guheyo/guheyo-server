import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { SocialAccountCommandRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.command.repository';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountSavePort } from '@lib/domains/social-account/port/out/social-account.save.port';
import { SocialAccountUpdateCommand } from '../social-account.update.command';
import { SocialAccountUpdateHandler } from '../social-account.update.handler';

describe('SocialAccountUpdateCommand', () => {
  let handler: SocialAccountUpdateHandler;
  const savePort: SocialAccountSavePort = mock(SocialAccountCommandRepository);

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
      await handler.execute(command);
      verify(savePort.update(anyOfClass(SocialAccountEntity))).once();
    });
  });
});
