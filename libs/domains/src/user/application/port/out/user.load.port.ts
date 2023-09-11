import { FindLoginUserByIdQuery } from '../../queries/find-login-user-by-id/find-login-user-by-id.query';
import { UserGetBySocialAccountQuery } from '../../queries/user-get-by-social-account/user.get-by-social-account.query';
import { LoginUserResponse } from '../../dtos/login-user.response';

export interface UserLoadPort {
  findLoginUserById(query: FindLoginUserByIdQuery): Promise<LoginUserResponse | null>;
  getLoginUserBySocailAccount(
    query: UserGetBySocialAccountQuery,
  ): Promise<LoginUserResponse | null>;
}
