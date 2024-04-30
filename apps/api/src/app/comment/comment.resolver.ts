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
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DeleteCommentInput } from '@lib/domains/comment/application/commands/delete-comment/delete-comment.input';
import { DeleteCommentCommand } from '@lib/domains/comment/application/commands/delete-comment/delete-comment.command';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { FindCommentsArgs } from '@lib/domains/comment/application/queries/find-comments/find-comments.args';
import { FindCommentsQuery } from '@lib/domains/comment/application/queries/find-comments/find-comments.query';
import { PaginatedCommentsResponse } from '@lib/domains/comment/application/queries/find-comments/paginated-comments.response';
import { DeleteCommentResult } from '@lib/domains/comment/application/dtos/delete-comment.result';
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

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedCommentsResponse)
  async findComments(@Args() args: FindCommentsArgs, @ExtractedUser() user: MyUserResponse) {
    const query = new FindCommentsQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => String)
  async createComment(
    @Args('input') input: CreateCommentInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateCommentCommand({ input, user }));
    return input.id;
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => CommentResponse)
  async updateComment(
    @Args('input') input: UpdateCommentInput,
    @ExtractedUser() user: MyUserResponse,
  ) {
    return this.commandBus.execute(new UpdateCommentCommand({ input, user }));
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => DeleteCommentResult)
  async deleteComment(
    @Args('input') input: DeleteCommentInput,
    @ExtractedUser() user: MyUserResponse,
  ) {
    return this.commandBus.execute(new DeleteCommentCommand({ input, user }));
  }
}
