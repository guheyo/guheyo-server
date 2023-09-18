import { UserEntity } from '@lib/domains/user/domain/user.entity';

export interface UserLoadPort {
  findUserById(id: string): Promise<UserEntity | null>;
  findUserBySocialAccount(provider: string, socialId: string): Promise<UserEntity | null>;
}
