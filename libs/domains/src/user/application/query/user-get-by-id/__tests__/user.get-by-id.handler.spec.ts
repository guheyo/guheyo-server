import { Test } from '@nestjs/testing';
import { mock, verify, instance } from 'ts-mockito';
import { UserQueryAdapter } from '@lib/domains/user/adapter/out/persistence/user.query.adapter';
import { UserLoadPort } from '../../../port/out/user.load.port';
import { UserGetByIdQuery } from '../user.get-by-id.query';
import { UserGetByIdHandler } from '../user.get-by-id.handler';

describe('UserGetByIdQuery', () => {
  let handler: UserGetByIdHandler;
  const loadPort: UserLoadPort = mock(UserQueryAdapter);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserGetByIdHandler,
        {
          provide: 'UserLoadPort',
          useValue: instance(loadPort),
        },
      ],
    }).compile();
    handler = moduleRef.get<UserGetByIdHandler>(UserGetByIdHandler);
  });

  describe('execute', () => {
    it('should execute getById', async () => {
      const query: UserGetByIdQuery = { id: 'user-id' };
      await handler.execute(query);
      verify(loadPort.getById(query.id)).once();
    });
  });
});
