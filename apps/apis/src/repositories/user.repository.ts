import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '~apis/src/interfaces';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(args: Prisma.UserFindUniqueOrThrowArgs): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({ ...args });
  }

  async findFirst(args: Prisma.UserFindFirstOrThrowArgs): Promise<User> {
    return this.prisma.user.findFirstOrThrow({ ...args });
  }

  async create(args: Prisma.UserCreateArgs): Promise<User> {
    return this.prisma.user.create({ ...args });
  }

  async update(args: Prisma.UserUpdateArgs): Promise<User> {
    return this.prisma.user.update({ ...args });
  }

  async delete(args: Prisma.UserDeleteArgs): Promise<User> {
    return this.prisma.user.delete({ ...args });
  }
}
