import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { UserQueryAdapter } from '@lib/domains/user/adapter/out/persistence/user.query.adapter';
import { UserLoadPort } from '../../../port/out/user.load.port';
import { UserGetBySocialAccountQuery } from '../user.get-by-social-account.query';
import { UserGetBySocialAccountHandler } from '../user.get-by-social-account.handler';

describe('UserGetBySocialAccountQuery', () => {
  let handler: UserGetBySocialAccountHandler;
  const loadPort: UserLoadPort = mock(UserQueryAdapter);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserGetBySocialAccountHandler,
        {
          provide: 'UserLoadPort',
          useValue: instance(loadPort),
        },
      ],
    }).compile();

    handler = moduleRef.get<UserGetBySocialAccountHandler>(UserGetBySocialAccountHandler);
  });

  describe('execute', () => {
    it('should execute getBySocailAccount', async () => {
      const query: UserGetBySocialAccountQuery = { provider: 'discord', socialId: 'social-id' };
      await handler.execute(query);
      verify(loadPort.getBySocailAccount(query)).once();
    });
  });
});
