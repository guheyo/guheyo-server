import { UserResponse } from './user.response';

export interface UserQueryUseCase {
  getUserById(id: string): Promise<UserResponse | null>;
  getUserBySocialAccount(provider: string, socialId: string): Promise<UserResponse | null>;
}
