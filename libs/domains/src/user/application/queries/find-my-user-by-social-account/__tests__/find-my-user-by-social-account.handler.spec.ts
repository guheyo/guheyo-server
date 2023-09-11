import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { UserQueryRepository } from '@lib/domains/user/adapter/out/persistence/user.query.repository';
import { UserLoadPort } from '../../../port/out/user.load.port';
import { FindMyUserBySocialAccountQuery } from '../find-my-user-by-social-account.query';
import { FindMyUserBySocialAccountHandler } from '../find-my-user-by-social-account.handler';

describe('FindMyUserBySocialAccountQuery', () => {
  let handler: FindMyUserBySocialAccountHandler;
  const loadPort: UserLoadPort = mock(UserQueryRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindMyUserBySocialAccountHandler,
        {
          provide: 'UserLoadPort',
          useValue: instance(loadPort),
        },
      ],
    }).compile();

    handler = moduleRef.get<FindMyUserBySocialAccountHandler>(
      FindMyUserBySocialAccountHandler,
    );
  });

  describe('execute', () => {
    it('should execute findMyUserBySocailAccount', async () => {
      const query: FindMyUserBySocialAccountQuery = {
        provider: 'discord',
        socialId: 'social-id',
      };
      await handler.execute(query);
      verify(loadPort.findMyUserBySocailAccount(query)).once();
    });
  });
});
