import { Module } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { FindMyUserByIdHandler } from './find-my-user-by-id/find-my-user-by-id.handler';
import { FindMyUserBySocialAccountHandler } from './find-my-user-by-social-account/find-my-user-by-social-account.handler';
import { FindUsersHandler } from './find-users/find-users.handler';

const queryHandlers = [FindMyUserByIdHandler, FindMyUserBySocialAccountHandler, FindUsersHandler];

@Module({
  providers: [...queryHandlers, PrismaService],
})
export class UserQueryModule {}
