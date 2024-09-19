import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { PaginatedBiddersResponse } from './paginated-bidders.response';
import { FindBiddersQuery } from './find-bidders.query';

@QueryHandler(FindBiddersQuery)
export class FindBiddersHandler extends PrismaQueryHandler {
  async execute(query: FindBiddersQuery): Promise<PaginatedBiddersResponse> {
    const auction = await this.prismaService.auction.findUnique({
      where: {
        id: query.where.auctionId,
      },
      include: {
        bids: {
          where: {
            canceledAt: null,
          },
          include: {
            user: {
              include: {
                ...(query.user?.id && {
                  followers: {
                    where: {
                      followerId: query.user.id,
                    },
                  },
                }),
              },
            },
          },
          orderBy: {
            createdAt: query.orderBy?.createdAt,
          },
        },
      },
    });

    if (!auction) {
      throw new NotFoundException(AuctionErrorMessage.AUCTION_NOT_FOUND);
    }

    const users = auction.bids
      .map((bid) => bid.user)
      .filter((user, index, self) => self.findIndex((u) => u.id === user.id) === index);

    const filteredUsers = query.keyword
      ? users.filter((user) => user.username.toLowerCase().includes(query.keyword!.toLowerCase()))
      : users;

    const cursorIndex = query.cursor
      ? filteredUsers.findIndex((user) => user.id === query.cursor)
      : -1;

    const cursorBasedUsers =
      cursorIndex !== -1
        ? filteredUsers.slice(cursorIndex + 1, cursorIndex + 1 + query.take + 1)
        : filteredUsers.slice(0, query.take + 1);

    return paginate<UserResponse>(
      cursorBasedUsers.map((user) =>
        plainToInstance(UserResponse, {
          ...user,
          followed: query.user && user.followers.length > 0,
        }),
      ),
      'id',
      query.take,
    );
  }
}
