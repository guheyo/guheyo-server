import { FindMyUserByIdQuery } from '../../queries/find-my-user-by-id/find-my-user-by-id.query';
import { FindMyUserBySocialAccountQuery } from '../../queries/find-my-user-by-social-account/find-my-user-by-social-account.query';
import { MyUserResponse } from '../../dtos/my-user.response';
import { FindUsersQuery } from '../../queries/find-users/find-users.query';
import { PaginatedUsersResponse } from '../../queries/find-users/paginated-users.response';

export interface UserLoadPort {
  findMyUserById(query: FindMyUserByIdQuery): Promise<MyUserResponse | null>;
  findMyUserBySocailAccount(query: FindMyUserBySocialAccountQuery): Promise<MyUserResponse | null>;
  findUsers(query: FindUsersQuery): Promise<PaginatedUsersResponse>;
}
