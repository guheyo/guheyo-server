import { EmbedBuilder, WebhookClient } from 'discord.js';
import { AUCTION_CLOSED } from '@lib/domains/auction/domain/auction.constants';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

export const handler = async (event: any): Promise<void> => {
  const { auctionId, extendedEndDate } = event;

  if (!auctionId || !extendedEndDate) {
    console.error('Invalid event data: auctionId and extendedEndDate are required');
    return;
  }

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DB_URL,
        },
      },
    });

    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        post: {
          include: {
            user: {
              include: {
                socialAccounts: {
                  where: {
                    provider: 'discord',
                  },
                },
              },
            },
          },
        },
        bids: {
          where: {
            canceledAt: null,
          },
          orderBy: {
            price: 'desc',
          },
        },
      },
    });

    if (!auction) {
      console.error(`Auction with ID ${auctionId} not found.`);
      return;
    }

    const currentDateTime = new Date();
    const expectedEndDate = new Date(extendedEndDate);

    // Check if the current time is at least the extended end date
    if (currentDateTime < expectedEndDate) {
      console.log(
        `Current time (${currentDateTime}) is before the extended end date (${expectedEndDate}). No action taken.`,
      );
      await prisma.$disconnect();
      return;
    }

    // Check if the auction is already closed
    if (auction.status === AUCTION_CLOSED) {
      console.log(`Auction with ID ${auctionId} is already closed. No action taken.`);
      await prisma.$disconnect();
      return;
    }

    // Proceed with closing the auction
    await prisma.auction.update({
      where: {
        id: auction.id,
        version: auction.version,
      },
      data: {
        version: {
          increment: 1,
        },
        status: AUCTION_CLOSED,
      },
    });

    const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL! });

    const discordAccount = auction.post.user.socialAccounts.find(
      (account) => account.provider === 'discord',
    );

    const embed = new EmbedBuilder()
      .setAuthor({
        name: auction.post.user.username,
        iconURL: auction.post.user.avatarURL || undefined,
      })
      .setColor('Red')
      .setTitle(`${auction.post.title}`)
      .setDescription(
        `판매자: ${
          discordAccount ? `<@${discordAccount.socialId}>` : auction.post.user.username
        }\n경매 시작: ${dayjs(auction.createdAt).format('YYYY-MM-DD HH:mm')}\n경매 종료: ${dayjs(
          auction.extendedEndDate,
        ).format('YYYY-MM-DD HH:mm')}\n낙찰가: ${String(auction.bids[0]?.price || 0)}\n\n${
          process.env.FRONTEND_HOST
        }/auction/${auction.post.slug}`,
      );

    await webhookClient.send({ embeds: [embed] });

    const endTime = new Date();
    console.log(`Auction with ID ${auctionId} successfully ended at: ${endTime.toISOString()}`);

    await prisma.$disconnect();
  } catch (error) {
    console.error(`Error ending auction with ID ${auctionId}:`, error);
    throw error;
  }
};
