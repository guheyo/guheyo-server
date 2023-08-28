import { UserEntity } from '@lib/domains/user/domain/user.entity';

export interface UserLoadPort {
  getById(id: string): Promise<UserEntity | null>;
  getBySocailAccount(provider: string, socialId: string): Promise<UserEntity | null>;
}
