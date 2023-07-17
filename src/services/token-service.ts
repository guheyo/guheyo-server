import { VerificationToken } from '@prisma/client';
import { prisma } from '../loaders';

const tokenService = {
  async createVerificationToken(data: VerificationToken) {
    return prisma.verificationToken.create({
      data,
    });
  },
  async useVerificationToken(identifier: string) {
    return prisma.verificationToken.deleteMany({
      where: {
        identifier,
      },
    });
  },
};

export default tokenService;
