import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { UserQueryRepository } from '@lib/domains/user/adapter/out/persistence/user.query.repository';
import { UserLoadPort } from '../../../port/out/user.load.port';
import { FindLoginUserByIdQuery } from '../find-login-user-by-id.query';
import { FindLoginUserByIdHandler } from '../find-login-user-by-id.handler';

describe('FindLoginUserByIdQuery', () => {
  let handler: FindLoginUserByIdHandler;
  const loadPort: UserLoadPort = mock(UserQueryRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindLoginUserByIdHandler,
        {
          provide: 'UserLoadPort',
          useValue: instance(loadPort),
        },
      ],
    }).compile();
    handler = moduleRef.get<FindLoginUserByIdHandler>(FindLoginUserByIdHandler);
  });

  describe('execute', () => {
    it('should execute findLoginUserById', async () => {
      const query: FindLoginUserByIdQuery = { id: 'user-id' };
      await handler.execute(query);
      verify(loadPort.findLoginUserById(query)).once();
    });
  });
});
