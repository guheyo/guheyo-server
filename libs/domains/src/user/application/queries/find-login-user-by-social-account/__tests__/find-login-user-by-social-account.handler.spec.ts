import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { UserQueryRepository } from '@lib/domains/user/adapter/out/persistence/user.query.repository';
import { UserLoadPort } from '../../../port/out/user.load.port';
import { FindLoginUserBySocialAccountQuery } from '../find-login-user-by-social-account.query';
import { FindLoginUserBySocialAccountHandler } from '../find-login-user-by-social-account.handler';

describe('FindLoginUserBySocialAccountQuery', () => {
  let handler: FindLoginUserBySocialAccountHandler;
  const loadPort: UserLoadPort = mock(UserQueryRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindLoginUserBySocialAccountHandler,
        {
          provide: 'UserLoadPort',
          useValue: instance(loadPort),
        },
      ],
    }).compile();

    handler = moduleRef.get<FindLoginUserBySocialAccountHandler>(
      FindLoginUserBySocialAccountHandler,
    );
  });

  describe('execute', () => {
    it('should execute findLoginUserBySocailAccount', async () => {
      const query: FindLoginUserBySocialAccountQuery = {
        provider: 'discord',
        socialId: 'social-id',
      };
      await handler.execute(query);
      verify(loadPort.findLoginUserBySocailAccount(query)).once();
    });
  });
});
