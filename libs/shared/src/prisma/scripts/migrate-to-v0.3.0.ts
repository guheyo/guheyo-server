/* eslint-disable import/no-relative-packages */
import { omit } from 'lodash';
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

const migrateUser = async (offset = 0, batchSize = 100) => {
  const oldUsers = await prismaClient2.user.findMany({
    include: {
      members: {
        include: {
          roles: true,
        },
      },
      socialAccounts: true,
    },
    take: batchSize,
    skip: offset,
  });

  if (oldUsers.length === 0) {
    console.log('migrate user completed (offset): ', offset);
    return;
  }

  const promises = oldUsers.map(async (oldUser) =>
    prismaClient3.user.upsert({
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
    }),
  );
  await Promise.all(promises);

  await migrateUser(offset + batchSize, batchSize);
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

const migrateOffer = async (offset = 0, batchSize = 100) => {
  const oldOffers = await prismaClient2.offer.findMany({
    include: {
      seller: true,
      productCategory: true,
    },
    take: batchSize,
    skip: offset,
  });

  if (oldOffers.length === 0) {
    console.log('migrate offer completed (offset): ', offset);
    return;
  }

  const promises = oldOffers.map(async (oldOffer) =>
    prismaClient3.offer.upsert({
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
        id: oldOffer.id,
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
    }),
  );
  await Promise.all(promises);

  await migrateOffer(offset + batchSize, batchSize);
};

const migrateDemand = async (offset = 0, batchSize = 100) => {
  const oldDemands = await prismaClient2.demand.findMany({
    include: {
      buyer: true,
      productCategory: true,
    },
    take: batchSize,
    skip: offset,
  });

  if (oldDemands.length === 0) {
    console.log('migrate demand completed (offset): ', offset);
    return;
  }

  const promises = oldDemands.map(async (oldDemand) =>
    prismaClient3.offer.upsert({
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
        id: oldDemand.id,
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
    }),
  );
  await Promise.all(promises);

  await migrateDemand(offset + batchSize, batchSize);
};

const migrateSwap = async (offset = 0, batchSize = 100) => {
  const oldSwaps = await prismaClient2.swap.findMany({
    include: {
      proposer: true,
      productCategory: true,
    },
    take: batchSize,
    skip: offset,
  });

  if (oldSwaps.length === 0) {
    console.log('migrate swap completed (offset): ', offset);
    return;
  }

  const promises = oldSwaps.map(async (oldSwap) =>
    prismaClient3.offer.upsert({
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
        id: oldSwap.id,
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
    }),
  );
  await Promise.all(promises);

  await migrateSwap(offset + batchSize, batchSize);
};

const migrateUserImage = async (offset = 0, batchSize = 100) => {
  const oldUserImages = await prismaClient2.userImage.findMany({
    take: batchSize,
    skip: offset,
  });

  if (oldUserImages.length === 0) {
    console.log('migrate userImage completed (offset): ', offset);
    return;
  }

  const promises = oldUserImages.map(async (oldUserImage) =>
    prismaClient3.userImage.upsert({
      where: {
        id: oldUserImage.id,
      },
      create: {
        ...omit(oldUserImage, ['source']),
        type: ['offer', 'demand', 'swap'].includes(oldUserImage.type) ? 'offer' : oldUserImage.type,
      },
      update: {},
    }),
  );
  await Promise.all(promises);

  await migrateUserImage(offset + batchSize, batchSize);
};

const migratePostThumbnail = async (offset = 0, batchSize = 100) => {
  const offers = await prismaClient3.offer.findMany({
    take: batchSize,
    skip: offset,
  });

  if (offers.length === 0) {
    console.log('migrate postThumbnail completed (offset): ', offset);
    return;
  }

  const promises = offers.map(async (offer) => {
    const thumbnail = await prismaClient3.userImage.findFirst({
      where: {
        type: 'offer',
        refId: offer.id,
        tracked: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (thumbnail?.url) {
      return prismaClient3.post.update({
        where: {
          id: offer.postId,
        },
        data: {
          updatedAt: offer.updatedAt,
          thumbnail: thumbnail.url,
        },
      });
    }
    return null;
  });
  await Promise.all(promises);

  await migratePostThumbnail(offset + batchSize, batchSize);
};

const migrateTerm = async () => {
  const oldTerms = await prismaClient2.term.findMany();
  oldTerms.map(async (oldTerm) => {
    await prismaClient3.term.upsert({
      where: {
        id: oldTerm.id,
      },
      create: {
        ...oldTerm,
        meta: oldTerm.meta || undefined,
      },
      update: {},
    });
  });

  console.log('migrate oldTerm passed, oldTerms len: ', oldTerms.length);
};

const migrateBump = async () => {
  const oldBumps = await prismaClient2.bump.findMany();
  oldBumps.map(async (oldBump) => {
    await prismaClient3.bump.upsert({
      where: {
        id: oldBump.id,
      },
      create: {
        id: oldBump.id,
        createdAt: oldBump.createdAt,
        updatedAt: oldBump.updatedAt,
        deletedAt: oldBump.deletedAt,
        offerId: (oldBump.offerId || oldBump.demandId || oldBump.swapId)!,
        oldPrice: oldBump.oldPrice,
        newPrice: oldBump.newPrice,
      },
      update: {},
    });
  });

  console.log('migrate oldBump passed, oldBumps len: ', oldBumps.length);
};

async function migrateData() {
  // await migrateRole();
  // await migrateUser();
  // await migrateCategory();
  // await migrateOffer();
  // await migrateDemand();
  // await migrateSwap();
  // await migrateUserImage();
  // await migratePostThumbnail();
  // await migrateTerm();
  // await migrateBump();
}

migrateData();
