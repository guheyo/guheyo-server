import { Session } from '@prisma/client';
import { prisma } from '../loaders';

const sessionService = {
  async createSession(data: Session) {
    return prisma.session.create({
      data,
    });
  },
  async getSessionAndUser(sessionToken: string) {
    const sessionAndUser = await prisma.session.findUnique({
      where: {
        sessionToken,
      },
      include: {
        user: {
          include: {
            roles: {
              orderBy: {
                rank: 'asc',
              },
            },
            socialAccounts: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    });
    if (!sessionAndUser) return null;
    const { user, ...session } = sessionAndUser;
    return {
      session,
      user,
    };
  },
  async updateSession(data: Session) {
    return prisma.session.update({
      where: {
        sessionToken: data.sessionToken,
      },
      data,
    });
  },
  async deleteSession(sessionToken: string) {
    return prisma.session.delete({
      where: {
        sessionToken,
      },
    });
  },
};

export default sessionService;
