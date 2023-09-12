import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { UserQueryRepository } from '@lib/domains/user/adapter/out/persistence/user.query.repository';
import { UserLoadPort } from '../../../port/out/user.load.port';
import { FindMyUserByIdQuery } from '../find-my-user-by-id.query';
import { FindMyUserByIdHandler } from '../find-my-user-by-id.handler';

describe('FindMyUserByIdQuery', () => {
  let handler: FindMyUserByIdHandler;
  const loadPort: UserLoadPort = mock(UserQueryRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindMyUserByIdHandler,
        {
          provide: 'UserLoadPort',
          useValue: instance(loadPort),
        },
      ],
    }).compile();
    handler = moduleRef.get<FindMyUserByIdHandler>(FindMyUserByIdHandler);
  });

  describe('execute', () => {
    it('should execute findMyUserById', async () => {
      const query: FindMyUserByIdQuery = { id: 'user-id' };
      await handler.execute(query);
      verify(loadPort.findMyUserById(query)).once();
    });
  });
});
