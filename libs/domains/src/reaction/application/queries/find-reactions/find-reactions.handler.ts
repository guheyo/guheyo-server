import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { ReactionResponse } from '../../dtos/reaction.response';
import { FindReactionsQuery } from './find-reactions.query';

@QueryHandler(FindReactionsQuery)
export class FindReactionsHandler extends PrismaQueryHandler {
  async execute(query: FindReactionsQuery): Promise<ReactionResponse[]> {
    const reactions = await this.prismaService.reaction.findMany({
      where: {
        postId: query.postId,
        commentId: query.commentId || null,
        canceledAt: null,
      },
      orderBy: [
        {
          emoji: {
            position: 'asc',
          },
        },
      ],
      include: {
        emoji: true,
      },
    });

    return reactions.map((reaction) => plainToInstance(ReactionResponse, reaction));
  }
}
