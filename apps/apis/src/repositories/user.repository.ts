import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '~apis/src/interfaces';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(args: Prisma.UserFindUniqueOrThrowArgs): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: args.where,
      include: args.include,
    });
  }
}
