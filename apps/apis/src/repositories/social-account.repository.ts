import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/database/prisma.service';
import { Prisma, SocialAccount, User } from '@prisma/client';
import { ISocialAccountRepository } from '~apis/src/interfaces/repositories/social-account.repository.interface';

@Injectable()
export class SocialAccountRepository implements ISocialAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(args: Prisma.SocialAccountFindUniqueOrThrowArgs): Promise<SocialAccount> {
    return this.prisma.socialAccount.findUniqueOrThrow({ ...args });
  }

  async findFirst(args: Prisma.SocialAccountFindFirstOrThrowArgs): Promise<SocialAccount> {
    return this.prisma.socialAccount.findFirstOrThrow({ ...args });
  }

  async create(args: Prisma.SocialAccountCreateArgs): Promise<SocialAccount> {
    return this.prisma.socialAccount.create({ ...args });
  }

  async update(args: Prisma.SocialAccountUpdateArgs): Promise<SocialAccount> {
    return this.prisma.socialAccount.update({ ...args });
  }

  async delete(args: Prisma.SocialAccountDeleteArgs): Promise<SocialAccount> {
    return this.prisma.socialAccount.delete({ ...args });
  }
}
