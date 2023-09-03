import { Injectable } from '@nestjs/common';
import { UserLoadPort } from '@lib/domains/user/application/port/out/user.load.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserQueryRepository } from './user.query.repository';

@Injectable()
export class UserQueryAdapter implements UserLoadPort {
  constructor(private repository: UserQueryRepository) {}

  async getById(id: string): Promise<UserEntity | null> {
    return this.repository.getById(id);
  }

  async getBySocailAccount(provider: string, socialId: string): Promise<UserEntity | null> {
    return this.repository.getBySocialAccount(provider, socialId);
  }
}
