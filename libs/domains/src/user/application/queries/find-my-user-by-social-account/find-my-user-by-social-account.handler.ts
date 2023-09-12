import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FindMyUserBySocialAccountQuery } from './find-my-user-by-social-account.query';
import { UserLoadPort } from '../../port/out/user.load.port';
import { MyUserResponse } from '../../dtos/my-user.response';

@QueryHandler(FindMyUserBySocialAccountQuery)
export class FindMyUserBySocialAccountHandler
  implements IQueryHandler<FindMyUserBySocialAccountQuery>
{
  constructor(@Inject('UserLoadPort') private userLoadPort: UserLoadPort) {}

  async execute(query: FindMyUserBySocialAccountQuery): Promise<MyUserResponse | null> {
    return this.userLoadPort.findMyUserBySocailAccount(query);
  }
}
