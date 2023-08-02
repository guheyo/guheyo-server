import { Prisma, SocialAccount } from '@prisma/client';

export interface ISocialAccountRepository {
  findUnique(args: Prisma.SocialAccountFindUniqueOrThrowArgs): Promise<SocialAccount>;
  findFirst(args: Prisma.SocialAccountFindFirstOrThrowArgs): Promise<SocialAccount>;
  create(args: Prisma.SocialAccountCreateArgs): Promise<SocialAccount>;
  update(args: Prisma.SocialAccountUpdateArgs): Promise<SocialAccount>;
  delete(args: Prisma.SocialAccountDeleteArgs): Promise<SocialAccount>;
}
