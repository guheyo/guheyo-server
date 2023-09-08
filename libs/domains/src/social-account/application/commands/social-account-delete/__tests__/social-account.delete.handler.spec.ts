import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { SocialAccountCommandRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.command.repository';
import { SocialAccountSavePort } from '@lib/domains/social-account/port/out/social-account.save.port';
import { SocialAccountDeleteCommand } from '../social-account.delete.command';
import { SocialAccountDeleteHandler } from '../social-account.delete.handler';

describe('SocialAccountDeleteCommand', () => {
  let handler: SocialAccountDeleteHandler;
  const savePort: SocialAccountSavePort = mock(SocialAccountCommandRepository);

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
      verify(savePort.delete(command)).once();
    });
  });
});
