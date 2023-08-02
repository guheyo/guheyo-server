import { Prisma, User } from '@prisma/client';

export interface IUserRepository {
  findOne(args: Prisma.UserFindUniqueOrThrowArgs): Promise<User>;
}
