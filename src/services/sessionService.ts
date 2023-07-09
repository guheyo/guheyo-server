import { Session, SocialAccount, User, VerificationToken } from '@prisma/client';
import { prisma } from '../loaders';
import _ from 'lodash';

const sessionService = {
  async createSession(data: Session) {
    return prisma.session.create({
      data: data
    });
  },
  async getSessionAndUser(sessionToken: string) {
    const sessionAndUser = await prisma.session.findUnique({
      where: {
        sessionToken: sessionToken
      },
      include: {
        user: {
          include: {
            roles: {
              orderBy: {
                rank: 'asc'
              }
            },
            socialAccounts: {
              orderBy: {
                createdAt: 'asc'
              }
            }
          }
        }
      }
    });
    if (!sessionAndUser) return null;
    const {
      user,
      ... session
    } = sessionAndUser;
    return {
      session,
      user
    };
  },
  async updateSession(data: Session) {
    return prisma.session.update({
      where: {
        sessionToken: data.sessionToken
      },
      data: data
    });
  },
  async deleteSession(sessionToken: string) {
    return prisma.session.delete({
      where: {
        sessionToken: sessionToken
      }
    });
  },
}

export default sessionService;