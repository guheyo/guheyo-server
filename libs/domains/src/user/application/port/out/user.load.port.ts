import { FindLoginUserByIdQuery } from '../../queries/find-login-user-by-id/find-login-user-by-id.query';
import { FindLoginUserBySocialAccountQuery } from '../../queries/find-login-user-by-social-account/find-login-user-by-social-account.query';
import { LoginUserResponse } from '../../dtos/login-user.response';

export interface UserLoadPort {
  findLoginUserById(query: FindLoginUserByIdQuery): Promise<LoginUserResponse | null>;
  findLoginUserBySocailAccount(
    query: FindLoginUserBySocialAccountQuery,
  ): Promise<LoginUserResponse | null>;
}
