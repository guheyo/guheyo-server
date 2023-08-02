import { Prisma, User } from '@prisma/client';

export interface IUserRepository {
  findUnique(args: Prisma.UserFindUniqueOrThrowArgs): Promise<User>;
  findFirst(args: Prisma.UserFindFirstOrThrowArgs): Promise<User>;
  create(args: Prisma.UserCreateArgs): Promise<User>;
  update(args: Prisma.UserUpdateArgs): Promise<User>;
  delete(args: Prisma.UserDeleteArgs): Promise<User>;
}
