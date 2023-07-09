import { prisma } from '../loaders';
import { User } from '@prisma/client';
import _ from 'lodash';

const userService = {
  async createUser(data: User) {
    return prisma.user.create({
      data: data
    });
  },
  async getUser(id: string) {
    return prisma.user.findUnique({
      where: {
        id: id
      },
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
    });
  },
  async getUserBySocailAccount(provider: string, socialId: string) {
    const socailAccount = await prisma.socialAccount.findFirst({
      where: {
        provider: provider,
        socialId: socialId,
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
    return socailAccount?.user;
  },
  async updateUser(id: string, data: User) {
    return prisma.user.update({
      where: {
        id: id
      },
      data: data,
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
    });
  },
  async deleteUser(id: string) {
    return prisma.user.delete({
      where: {
        id: id
      }
    });
  },
  async connectRoles(id: string, roleIds: string[]) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        roles: {
          connect: roleIds.map((id) => {
            return {
              id: id
            }
          })
        }
      },
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
    });
  },
  async disconnectRoles(id: string, roleIds: string[]) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        roles: {
          disconnect: roleIds.map((id) => {
            return {
              id: id
            }
          })
        }
      },
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
    });
  },
  async setRoles(id: string, roleIds: string[]) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        roles: {
          set: roleIds.map((id) => {
            return {
              id: id
            }
          })
        }
      },
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
    });
  },
}

export default userService;