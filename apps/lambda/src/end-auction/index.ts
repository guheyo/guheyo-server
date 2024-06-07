import { AUCTION_CLOSED } from '@lib/domains/auction/domain/auction.constants';
import { PrismaClient } from '@prisma/client';

export const handler = async (event: any): Promise<void> => {
  const { auctionId } = event;

  try {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DB_URL,
    });

    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
    });

    if (!auction) {
      console.error(`Auction with ID ${auctionId} not found.`);
      return;
    }

    // Update the auction status to 'end'
    await prisma.auction.update({
      where: { id: auctionId },
      data: { status: AUCTION_CLOSED },
    });

    console.log(`Auction with ID ${auctionId} successfully ended.`);
    await prisma.$disconnect();
  } catch (error) {
    console.error(`Error ending auction with ID ${auctionId}:`, error);
    throw error;
  }
};
