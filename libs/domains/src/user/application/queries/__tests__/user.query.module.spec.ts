import { Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { FindUsersQuery } from '../find-users/find-users.query';
import { FindUsersHandler } from '../find-users/find-users.handler';
import { FindUserHandler } from '../find-user/find-user.handler';
import { FindUserQuery } from '../find-user/find-user.query';
import { FindMyUserQuery } from '../find-my-user/find-my-user.query';
import { FindMyUserHandler } from '../find-my-user/find-my-user.handler';

describe('UserQueryModule', () => {
  let findMyUserHandler: FindMyUserHandler;
  let findUserHandler: FindUserHandler;
  let findUsersHandler: FindUsersHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, ConfigYamlModule, PrismaModule],
      providers: [FindMyUserHandler, FindUserHandler, FindUsersHandler],
    }).compile();
    findMyUserHandler = moduleRef.get<FindMyUserHandler>(FindMyUserHandler);
    findUserHandler = moduleRef.get<FindUserHandler>(FindUserHandler);
    findUsersHandler = moduleRef.get<FindUsersHandler>(FindUsersHandler);
  });

  describe('execute', () => {
    it('should be null given an invalid id', async () => {
      const query: FindMyUserQuery = { userId: 'test' };
      const user = await findMyUserHandler.execute(query);
      expect(user).toBeNull();
    });
  });

  describe('execute', () => {
    it('should be null given an invalid socialId', async () => {
      const query: FindUserQuery = { provider: 'discord', socialId: 'test' };
      const user = await findUserHandler.execute(query);
      expect(user).toBeNull();
    });
  });

  describe('execute', () => {
    it('should be 0 given an invalid cursor', async () => {
      const query: FindUsersQuery = { skip: 1, take: 1, cursor: 'test-id' };
      const user = await findUsersHandler.execute(query);
      expect(user.edges.length).toBe(0);
    });
  });
});
