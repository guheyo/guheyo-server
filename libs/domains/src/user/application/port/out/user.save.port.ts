import { UserEntity } from '@lib/domains/user/domain/user.entity';

export interface UserSavePort {
  create(user: UserEntity): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
}
