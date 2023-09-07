import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { SocialAccountSavePort } from '../../../port/out/social-account.save.port';
import { SocialAccountDeleteCommand } from '../social-account.delete.command';
import { SocialAccountDeleteHandler } from '../social-account.delete.handler';

describe('SocialAccountDeleteCommand', () => {
  let handler: SocialAccountDeleteHandler;
  const savePort: SocialAccountSavePort = mock(UserCommandRepository);

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
        provider: 'discord',
        socialId: 'social-id',
        userId: 'user-id',
      };
      await handler.execute(command);
      verify(savePort.deleteSocialAccount(command)).once();
    });
  });
});
