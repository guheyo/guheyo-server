import { VerificationToken } from '@prisma/client';
import { prisma } from '../loaders';
import _ from 'lodash';

const tokenService = {
  async createVerificationToken(data: VerificationToken) {
    return prisma.verificationToken.create({
      data: data
    });
  },
  async useVerificationToken(identifier: string) {
    return prisma.verificationToken.deleteMany({
      where: {
        identifier: identifier
      }
    });
  },
}

export default tokenService;