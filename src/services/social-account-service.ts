import { SocialAccount } from '@prisma/client';
import { prisma } from '../loaders';

const socialAccountService = {
  async getSocialAccount(provider: string, socialId: string) {
    return prisma.socialAccount.findFirst({
      where: {
        provider,
        socialId,
      },
      include: {
        user: true,
      },
    });
  },
  async linkAccount(data: SocialAccount) {
    return prisma.socialAccount.create({
      data,
    });
  },
  async unlinkAccount(provider: string, socialId: string) {
    return prisma.socialAccount.deleteMany({
      where: {
        provider,
        socialId,
        deleted: false,
      },
    });
  },
};

export default socialAccountService;
