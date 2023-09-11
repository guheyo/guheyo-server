import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FindLoginUserBySocialAccountQuery } from './find-login-user-by-social-account.query';
import { UserLoadPort } from '../../port/out/user.load.port';
import { LoginUserResponse } from '../../dtos/login-user.response';

@QueryHandler(FindLoginUserBySocialAccountQuery)
export class FindLoginUserBySocialAccountHandler
  implements IQueryHandler<FindLoginUserBySocialAccountQuery>
{
  constructor(@Inject('UserLoadPort') private userLoadPort: UserLoadPort) {}

  async execute(query: FindLoginUserBySocialAccountQuery): Promise<LoginUserResponse | null> {
    return this.userLoadPort.findLoginUserBySocailAccount(query);
  }
}
