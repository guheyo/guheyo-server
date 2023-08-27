import { UserCreateRequest } from './user.create.request';
import { UserUpdateRequest } from './user.update.request';
import { UserResponse } from './user.response';

export interface UserCommandUseCase {
  create(userCreateRequest: UserCreateRequest): Promise<UserResponse | null>;
  update(userUpdateRequest: UserUpdateRequest): Promise<UserResponse | null>;
  delete(id: string): void;
}
