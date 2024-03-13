import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { FindSwapByIdQuery } from './find-swap-by-id.query';
import { SwapResponse } from '../../dtos/swap.response';

@QueryHandler(FindSwapByIdQuery)
export class FindSwapByIdHandler extends PrismaQueryHandler<FindSwapByIdQuery, SwapResponse> {
  constructor() {
    super(SwapResponse);
  }

  async execute(query: FindSwapByIdQuery): Promise<any> {
    const swap = await this.prismaService.swap.findUnique({
      where: {
        id: query.id,
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
        reports: {
          include: {
            author: {
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
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_IS_NOT_FOUND);

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
