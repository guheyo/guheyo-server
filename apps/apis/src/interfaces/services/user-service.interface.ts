import { SocialAccount, User } from '@prisma/client';
import { GetUserBySocialAccountDto } from '~apis/src/dto/get-user-by-social-account.dto';

export interface IUserService {
  getUser(id: string): Promise<User>;
  getUserBySocialAccount(query: GetUserBySocialAccountDto): Promise<SocialAccount>;
  createUser(body: User): Promise<User>;
  updateUser(userId: string, body: User): Promise<User>;
  deleteUser(userId: string): Promise<User>;
}
