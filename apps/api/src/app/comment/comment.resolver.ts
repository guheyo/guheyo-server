import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { CreateCommentInput } from '@lib/domains/comment/application/commands/create-comment/create-comment.input';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { CommentResponse } from '@lib/domains/comment/application/dtos/comment.response';
import { FindCommentArgs } from '@lib/domains/comment/application/queries/find-comment/find-comment.args';
import { FindCommentQuery } from '@lib/domains/comment/application/queries/find-comment/find-comment.query';
import { UpdateCommentCommand } from '@lib/domains/comment/application/commands/update-comment/update-comment.command';
import { UpdateCommentInput } from '@lib/domains/comment/application/commands/update-comment/update-comment.input';
import { AuthorIdPath } from '@lib/domains/auth/decorators/author-id-path/author-id-path.decorator';
import { AuthorGuard } from '@lib/domains/auth/guards/author/author.guard';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class CommentResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => CommentResponse, { nullable: true })
  async findComment(@Args() args: FindCommentArgs) {
    const query = new FindCommentQuery(args);
    return this.queryBus.execute(query);
  }

  @AuthorIdPath('input.authorId')
  @UseGuards(RequiredJwtUserGuard, AuthorGuard)
  @Mutation(() => String)
  async createComment(@Args('input') input: CreateCommentInput): Promise<string> {
    await this.commandBus.execute(new CreateCommentCommand(input));
    return input.id;
  }

  @AuthorIdPath('input.authorId')
  @UseGuards(RequiredJwtUserGuard, AuthorGuard)
  @Mutation(() => CommentResponse)
  async updateComment(@Args('input') input: UpdateCommentInput) {
    return this.commandBus.execute(new UpdateCommentCommand(input));
  }
}
