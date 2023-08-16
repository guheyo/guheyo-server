import { User } from '@prisma/client';
import { prisma } from '../loaders';

const userService = {
  async createUser(data: User) {
    return prisma.user.create({
      data,
    });
  },
  async getUser(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
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
    });
  },
  async getUserBySocailAccount(provider: string, socialId: string) {
    const socailAccount = await prisma.socialAccount.findFirst({
      where: {
        provider,
        socialId,
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
    return socailAccount?.user;
  },
  async updateUser(id: string, data: User) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
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
    });
  },
  async deleteUser(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
  async connectRoles(id: string, roleIds: string[]) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        roles: {
          connect: roleIds.map((roleId) => ({
            id: roleId,
          })),
        },
      },
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
    });
  },
  async disconnectRoles(id: string, roleIds: string[]) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        roles: {
          disconnect: roleIds.map((roleId) => ({
            id: roleId,
          })),
        },
      },
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
    });
  },
  async setRoles(id: string, roleIds: string[]) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        roles: {
          set: roleIds.map((roleId) => ({
            id: roleId,
          })),
        },
      },
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
    });
  },
};

export default userService;
