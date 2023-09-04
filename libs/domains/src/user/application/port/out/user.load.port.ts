import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserGetBySocialAccountQuery } from '../../query/user-get-by-social-account/user.get-by-social-account.query';

export interface UserLoadPort {
  getById(id: string): Promise<UserEntity | null>;
  getBySocailAccount(query: UserGetBySocialAccountQuery): Promise<UserEntity | null>;
}
