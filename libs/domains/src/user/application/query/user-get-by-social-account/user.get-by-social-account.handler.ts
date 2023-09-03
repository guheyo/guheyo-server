import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserGetBySocialAccountQuery } from './user.get-by-social-account.query';
import { UserLoadPort } from '../../port/out/user.load.port';

@QueryHandler(UserGetBySocialAccountQuery)
export class UserGetBySocialAccountHandler implements IQueryHandler<UserGetBySocialAccountQuery> {
  constructor(@Inject('UserLoadPort') private userLoadPort: UserLoadPort) {}

  async execute(query: UserGetBySocialAccountQuery): Promise<UserEntity | null> {
    return this.userLoadPort.getBySocailAccount(query.provider, query.socialId);
  }
}
