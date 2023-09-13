import { Module } from '@nestjs/common';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { FindMyUserByIdHandler } from './find-my-user-by-id/find-my-user-by-id.handler';
import { UserQueryRepository } from '../../adapter/out/persistence/user.query.repository';
import { FindMyUserBySocialAccountHandler } from './find-my-user-by-social-account/find-my-user-by-social-account.handler';
import { FindUsersHandler } from './find-users/find-users.handler';

const queryHandlers = [FindMyUserByIdHandler, FindMyUserBySocialAccountHandler, FindUsersHandler];

@Module({
  imports: [PrismaModule],
  providers: [
    ...queryHandlers,
    {
      provide: 'UserLoadPort',
      useClass: UserQueryRepository,
    },
  ],
  exports: [
    ...queryHandlers,
    {
      provide: 'UserLoadPort',
      useClass: UserQueryRepository,
    },
  ],
})
export class UserQueryModule {}
