import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindCommentQuery } from './find-comment.query';
import { CommentResponse } from '../../dtos/comment.response';

@QueryHandler(FindCommentQuery)
export class FindCommentHandler extends PrismaQueryHandler<FindCommentQuery, CommentResponse> {
  constructor() {
    super(CommentResponse);
  }

  async execute(query: FindCommentQuery): Promise<CommentResponse | null> {
    const comment = await this.prismaService.comment.findFirst({
      where: {
        id: query.id,
        postId: query.postId,
      },
    });
    return this.parseResponse(comment);
  }
}
