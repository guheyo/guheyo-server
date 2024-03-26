import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { FindSwapQuery } from './find-swap.query';
import { SwapResponse } from '../../dtos/swap.response';

@QueryHandler(FindSwapQuery)
export class FindSwapHandler extends PrismaQueryHandler<FindSwapQuery, SwapResponse> {
  constructor() {
    super(SwapResponse);
  }

  async execute(query: FindSwapQuery): Promise<SwapResponse | null> {
    if (!query.id && !query.slug) return null;

    const swap = await this.prismaService.swap.findFirst({
      where: {
        id: query.id,
        slug: query.slug,
      },
      include: {
        group: true,
        proposer: {
          include: {
            members: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
            socialAccounts: true,
          },
        },
      },
    });
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_NOT_FOUND);
    if (swap.hidden && swap.proposerId !== query.userId)
      throw new ForbiddenException(SwapErrorMessage.FIND_REQUEST_FROM_UNAUTHORIZED_USER);

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: 'swap',
        refId: swap.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return this.parseResponse({
      ...swap,
      images,
    });
  }
}
