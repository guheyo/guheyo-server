/* eslint-disable import/no-relative-packages */
import { PrismaClient as PrismaClient2 } from '../generated/client-v0.2.0';
import { PrismaClient as PrismaClient3 } from '../generated/client-v0.3.0';

const prismaClient2 = new PrismaClient2({
  datasources: {
    db: {
      url: process.env.DB_URL_V0_2_0, // Connection string for the old database
    },
  },
});

const prismaClient3 = new PrismaClient3({
  datasources: {
    db: {
      url: process.env.DB_URL_V0_3_0, // Connection string for the old database
    },
  },
});

const migrateRole = async () => {
  const oldRoles = await prismaClient2.role.findMany();
  await oldRoles.map(async (oldRole) =>
    prismaClient3.role.upsert({
      where: {
        id: oldRole.id,
      },
      create: {
        id: oldRole.id,
        createdAt: oldRole.createdAt,
        updateedAt: oldRole.updateedAt,
        deletedAt: oldRole.deletedAt,
        name: oldRole.name,
        position: oldRole.position,
        hexColor: oldRole.hexColor,
        groupId: oldRole.groupId,
      },
      update: {},
    }),
  );

  console.log('migrate role passed, oldRoles len: ', oldRoles.length);
};

const migrateUser = async () => {
  const oldUsers = await prismaClient2.user.findMany({
    include: {
      members: {
        include: {
          roles: true,
        },
      },
      socialAccounts: true,
    },
  });
  const promises = oldUsers.map(async (oldUser) => {
    await prismaClient3.user.upsert({
      where: {
        id: oldUser.id,
      },
      create: {
        id: oldUser.id,
        createdAt: oldUser.createdAt,
        updatedAt: oldUser.updatedAt,
        username: oldUser.username,
        name: oldUser.name,
        about: oldUser.about,
        avatarURL: oldUser.avatarURL,
        bot: oldUser.bot,
        socialAccounts: {
          createMany: {
            data: oldUser.socialAccounts.map((account) => ({
              id: account.id,
              createdAt: account.createdAt,
              updatedAt: account.updatedAt,
              deletedAt: account.deletedAt,
              provider: account.provider,
              socialId: account.socialId,
              accessToken: account.accessToken,
              refreshToken: account.refreshToken,
              expiresAt: account.expiresAt,
              tokenType: account.tokenType,
              scope: account.scope,
            })),
          },
        },
        roles: {
          connect: oldUser.members[0]?.roles.map((r) => ({
            id: r.id,
          })),
        },
      },
      update: {},
    });
  });
  await Promise.all(promises);

  console.log('migrate user passed, oldUsers len: ', oldUsers.length);
};

async function migrateData() {
  await migrateRole();
  await migrateUser();
}

migrateData();
