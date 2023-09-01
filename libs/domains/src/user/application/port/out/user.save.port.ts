import { UserEntity } from '@lib/domains/user/domain/user.entity';

export interface UserSavePort {
  create(user: UserEntity): Promise<void>;
  update(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
