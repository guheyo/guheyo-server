import { UserQueryRepository } from '@lib/domains/user/adapter/out/persistence/user.query.repository';
import { Test } from '@nestjs/testing';
import { mock, instance, verify } from 'ts-mockito';
import { UserLoadPort } from '../../../port/out/user.load.port';
import { FindUsersHandler } from '../find-users.handler';
import { FindUsersQuery } from '../find-users.query';

describe('FindUsersHandler', () => {
  let handler: FindUsersHandler;
  const loadPort: UserLoadPort = mock(UserQueryRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindUsersHandler,
        {
          provide: 'UserLoadPort',
          useValue: instance(loadPort),
        },
      ],
    }).compile();

    handler = moduleRef.get<FindUsersHandler>(FindUsersHandler);
  });

  describe('execute', () => {
    it('should execute findUsers', async () => {
      const query: FindUsersQuery = {
        skip: 1,
        take: 3,
        cursor: 'test-id',
      };
      await handler.execute(query);
      verify(loadPort.findUsers(query)).once();
    });
  });
});
