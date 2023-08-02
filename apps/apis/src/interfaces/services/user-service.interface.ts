import { User } from '@prisma/client';

export interface IUserService {
  getUser(id: string): Promise<User>;
}
