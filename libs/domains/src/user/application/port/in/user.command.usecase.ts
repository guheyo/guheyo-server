import { UserCreateRequest } from './user.create.request';
import { UserUpdateRequest } from './user.update.request';
import { UserResponse } from './user.response';

export interface UserCommandUseCase {
  create(request: UserCreateRequest): Promise<UserResponse | null>;
  update(request: UserUpdateRequest): Promise<UserResponse | null>;
  delete(id: string): void;
}
