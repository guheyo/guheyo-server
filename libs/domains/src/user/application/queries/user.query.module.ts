import { Module } from '@nestjs/common';
import { FindMyUserByIdHandler } from './find-my-user-by-id/find-my-user-by-id.handler';
import { FindMyUserBySocialAccountHandler } from './find-my-user-by-social-account/find-my-user-by-social-account.handler';
import { FindUsersHandler } from './find-users/find-users.handler';

const queryHandlers = [FindMyUserByIdHandler, FindMyUserBySocialAccountHandler, FindUsersHandler];

@Module({
  providers: [...queryHandlers],
})
export class UserQueryModule {}
