import { Module } from '@nestjs/common';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { FindLoginUserByIdHandler } from './find-login-user-by-id/find-login-user-by-id.handler';
import { UserQueryRepository } from '../../adapter/out/persistence/user.query.repository';
import { FindLoginUserBySocialAccountHandler } from './find-login-user-by-social-account/find-login-user-by-social-account.handler';

const queryHandlers = [FindLoginUserByIdHandler, FindLoginUserBySocialAccountHandler];

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
