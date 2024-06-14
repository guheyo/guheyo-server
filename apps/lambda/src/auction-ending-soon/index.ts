import { EmbedBuilder, WebhookClient } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

export const handler = async (event: any): Promise<void> => {
  const { auctionId } = event;

  if (!auctionId) {
    console.error('Invalid event data: auctionId is required');
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
      await prisma.$disconnect();
      return;
    }

    const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL! });

    const unixTimestamp = Math.floor(auction.extendedEndDate.getTime() / 1000);
    const embed = new EmbedBuilder()
      .setAuthor({
        name: auction.post.user.username,
        iconURL: auction.post.user.avatarURL || undefined,
      })
      .setColor('Orange')
      .setTitle(`${auction.post.title}\n${process.env.FRONTEND_HOST}/auction/${auction.post.slug}`)
      .setDescription(
        `경매 시작: ${dayjs(auction.createdAt).format(
          'YYYY-MM-DD HH:mm',
        )}\n${`<t:${unixTimestamp}:R> 종료`}`,
      )
      .setFooter({
        text: `입찰가: ${String(auction.bids[0]?.price || 0)}`,
      });

    await webhookClient.send({ embeds: [embed] });

    console.log(
      `Webhook sent for Auction ${auctionId} with extended end date: ${dayjs(
        auction.extendedEndDate,
      ).format('YYYY-MM-DD HH:mm:ss')}`,
    );

    await prisma.$disconnect();
  } catch (error) {
    console.error(`Error handling auction with ID ${auctionId}:`, error);
    throw error;
  }
};
