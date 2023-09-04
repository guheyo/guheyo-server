import { Injectable } from '@nestjs/common';
import { UserLoadPort } from '@lib/domains/user/application/port/out/user.load.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserGetBySocialAccountQuery } from '@lib/domains/user/application/query/user-get-by-social-account/user.get-by-social-account.query';
import { UserQueryRepository } from './user.query.repository';

@Injectable()
export class UserQueryAdapter implements UserLoadPort {
  constructor(private repository: UserQueryRepository) {}

  async getById(id: string): Promise<UserEntity | null> {
    return this.repository.getById(id);
  }

  async getBySocailAccount(query: UserGetBySocialAccountQuery): Promise<UserEntity | null> {
    return this.repository.getBySocialAccount(query);
  }
}
