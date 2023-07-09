import { prisma } from '../loaders';
import { SocialAccount } from '@prisma/client';
import _ from 'lodash';

const socialAccountService = {
  async getSocialAccount(provider: string, socialId: string) {
    return prisma.socialAccount.findFirst({
      where: {
        provider: provider,
        socialId: socialId,
      },
      include: {
          user: true
      }
    });
  },
  async linkAccount(data: SocialAccount) {
    return prisma.socialAccount.create({
      data: data
    });
  },
  async unlinkAccount(provider: string, socialId: string) {
    return prisma.socialAccount.deleteMany({
      where: {
        provider: provider,
        socialId: socialId,
        deleted: false
      }
    });
  },
}

export default socialAccountService;