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
  oldRoles.map(async (oldRole) =>
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
  oldUsers.map(async (oldUser) => {
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

  console.log('migrate user passed, oldUsers len: ', oldUsers.length);
};

const migrateCategory = async () => {
  const oldCategories = await prismaClient2.productCategory.findMany();
  oldCategories.map(async (oldCategory) => {
    await prismaClient3.category.updateMany({
      where: {
        name: oldCategory.name,
      },
      data: {
        id: oldCategory.id,
      },
    });
  });

  console.log('migrate category passed, oldCategories len: ', oldCategories.length);
};

const migrateOffer = async () => {
  const oldOffers = await prismaClient2.offer.findMany({
    include: {
      seller: true,
      productCategory: true,
    },
  });
  oldOffers.map(async (oldOffer) => {
    await prismaClient3.offer.upsert({
      where: {
        id: oldOffer.id,
      },
      create: {
        post: {
          create: {
            createdAt: oldOffer.createdAt,
            updatedAt: oldOffer.updatedAt,
            deletedAt: oldOffer.deletedAt,
            type: 'offer',
            title: oldOffer.name,
            slug: oldOffer.slug,
            userAgent: oldOffer.source === 'discord' ? 'discord' : undefined,
            groupId: oldOffer.groupId,
            categoryId: oldOffer.productCategoryId,
            userId: oldOffer.sellerId,
          },
        },
        createdAt: oldOffer.createdAt,
        updatedAt: oldOffer.updatedAt,
        bumpedAt: oldOffer.bumpedAt,
        deletedAt: oldOffer.deletedAt,
        businessFunction: 'sell',
        name0: oldOffer.name,
        content: oldOffer.description,
        price: oldOffer.price,
        priceCurrency: oldOffer.priceCurrency,
        shippingCost: oldOffer.shippingCost,
        shippingType: oldOffer.shippingType,
        status: oldOffer.status,
      },
      update: {},
    });
  });

  console.log('migrate offer passed, oldOffers len: ', oldOffers.length);
};

const migrateDemand = async () => {
  const oldDemands = await prismaClient2.demand.findMany({
    include: {
      buyer: true,
      productCategory: true,
    },
  });
  oldDemands.map(async (oldDemand) => {
    await prismaClient3.offer.upsert({
      where: {
        id: oldDemand.id,
      },
      create: {
        post: {
          create: {
            createdAt: oldDemand.createdAt,
            updatedAt: oldDemand.updatedAt,
            deletedAt: oldDemand.deletedAt,
            type: 'offer',
            title: oldDemand.name,
            slug: oldDemand.slug,
            userAgent: oldDemand.source === 'discord' ? 'discord' : undefined,
            groupId: oldDemand.groupId,
            categoryId: oldDemand.productCategoryId,
            userId: oldDemand.buyerId,
          },
        },
        createdAt: oldDemand.createdAt,
        updatedAt: oldDemand.updatedAt,
        bumpedAt: oldDemand.bumpedAt,
        deletedAt: oldDemand.deletedAt,
        businessFunction: 'buy',
        name0: oldDemand.name,
        content: oldDemand.description,
        price: oldDemand.price,
        priceCurrency: oldDemand.priceCurrency,
        shippingCost: oldDemand.shippingCost,
        shippingType: oldDemand.shippingType,
        status: oldDemand.status,
      },
      update: {},
    });
  });

  console.log('migrate demand passed, oldDemands len: ', oldDemands.length);
};

const migrateSwap = async () => {
  const oldSwaps = await prismaClient2.swap.findMany({
    include: {
      proposer: true,
      productCategory: true,
    },
  });
  oldSwaps.map(async (oldSwap) => {
    await prismaClient3.offer.upsert({
      where: {
        id: oldSwap.id,
      },
      create: {
        post: {
          create: {
            createdAt: oldSwap.createdAt,
            updatedAt: oldSwap.updatedAt,
            deletedAt: oldSwap.deletedAt,
            type: 'offer',
            title: `${oldSwap.name0} - ${oldSwap.name1}`,
            slug: oldSwap.slug,
            userAgent: oldSwap.source === 'discord' ? 'discord' : undefined,
            groupId: oldSwap.groupId,
            categoryId: oldSwap.productCategoryId,
            userId: oldSwap.proposerId,
          },
        },
        createdAt: oldSwap.createdAt,
        updatedAt: oldSwap.updatedAt,
        bumpedAt: oldSwap.bumpedAt,
        deletedAt: oldSwap.deletedAt,
        businessFunction: 'swap',
        name0: oldSwap.name0,
        name1: oldSwap.name1,
        content: oldSwap.description0,
        price: oldSwap.price,
        priceCurrency: oldSwap.priceCurrency,
        shippingCost: oldSwap.shippingCost,
        shippingType: oldSwap.shippingType,
        status: oldSwap.status,
      },
      update: {},
    });
  });

  console.log('migrate swap passed, oldSwaps len', oldSwaps.length);
};

async function migrateData() {
  // await migrateRole();
  // await migrateUser();
  // await migrateCategory();
  // await migrateOffer();
  // await migrateDemand();
  // await migrateSwap();
}

migrateData();
