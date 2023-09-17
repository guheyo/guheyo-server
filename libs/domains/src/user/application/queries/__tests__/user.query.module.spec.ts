import { Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { FindMyUserByIdQuery } from '../find-my-user-by-id/find-my-user-by-id.query';
import { FindMyUserByIdHandler } from '../find-my-user-by-id/find-my-user-by-id.handler';
import { FindMyUserBySocialAccountQuery } from '../find-my-user-by-social-account/find-my-user-by-social-account.query';
import { FindMyUserBySocialAccountHandler } from '../find-my-user-by-social-account/find-my-user-by-social-account.handler';
import { FindUsersQuery } from '../find-users/find-users.query';
import { FindUsersHandler } from '../find-users/find-users.handler';

describe('UserQueryModule', () => {
  let findMyUserByIdHandler: FindMyUserByIdHandler;
  let findMyUserBySocialAccountHandler: FindMyUserBySocialAccountHandler;
  let findUsersHandler: FindUsersHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, ConfigYamlModule, PrismaModule],
      providers: [FindMyUserByIdHandler, FindMyUserBySocialAccountHandler, FindUsersHandler],
    }).compile();
    findMyUserByIdHandler = moduleRef.get<FindMyUserByIdHandler>(FindMyUserByIdHandler);
    findMyUserBySocialAccountHandler = moduleRef.get<FindMyUserBySocialAccountHandler>(
      FindMyUserBySocialAccountHandler,
    );
    findUsersHandler = moduleRef.get<FindUsersHandler>(FindUsersHandler);
  });

  describe('execute', () => {
    it('should be null given an invalid id', async () => {
      const query: FindMyUserByIdQuery = { id: 'test' };
      const user = await findMyUserByIdHandler.execute(query);
      expect(user).toBeNull();
    });
  });

  describe('execute', () => {
    it('should be null given an invalid socialId', async () => {
      const query: FindMyUserBySocialAccountQuery = { provider: 'discord', socialId: 'test' };
      const user = await findMyUserBySocialAccountHandler.execute(query);
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
