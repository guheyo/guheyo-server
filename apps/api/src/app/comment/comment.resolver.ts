import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
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
import { DeletedCommentResponse } from '@lib/domains/comment/application/commands/delete-comment/deleted-comment.response';
import { CommentWithAuthorResponse } from '@lib/domains/comment/application/dtos/comment-with-author.response';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { parseCommentCreatedTriggerName } from '@lib/domains/comment/application/subscriptions/comment-created/parse-comment-created-trigger-name';
import { CommentCreatedArgs } from '@lib/domains/comment/application/subscriptions/comment-created/comment-created.args';
import { CommentDeletedArgs } from '@lib/domains/comment/application/subscriptions/comment-deleted/comment-deleted.args';
import { parseCommentDeletedTriggerName } from '@lib/domains/comment/application/subscriptions/comment-deleted/parse-comment-deleted-trigger-name';
import { UpdatedCommentResponse } from '@lib/domains/comment/application/commands/update-comment/updated-comment.response';
import { CommentUpdatedArgs } from '@lib/domains/comment/application/subscriptions/comment-updated/comment-updated.args';
import { parseCommentUpdatedTriggerName } from '@lib/domains/comment/application/subscriptions/comment-updated/parse-comment-updated-trigger-name';
import { FindCommentCountQuery } from '@lib/domains/comment/application/queries/find-comment-count/find-comment-count.query';
import { CommentCountResponse } from '@lib/domains/comment/application/dtos/comment-count.response';
import { FindCommentCountArgs } from '@lib/domains/comment/application/queries/find-comment-count/find-comment-count.args';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@Resolver()
export class CommentResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(GqlThrottlerBehindProxyGuard)
  @Query(() => CommentResponse, { nullable: true })
  async findComment(@Args() args: FindCommentArgs) {
    const query = new FindCommentQuery(args);
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => PaginatedCommentsResponse)
  async findComments(@Args() args: FindCommentsArgs, @ExtractedUser() user: MyUserResponse) {
    const query = new FindCommentsQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard)
  @Query(() => CommentCountResponse)
  async findCommentCount(@Args() args: FindCommentCountArgs) {
    const query = new FindCommentCountQuery(args);
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, RequiredJwtUserGuard)
  @Mutation(() => String)
  async createComment(
    @Args('input') input: CreateCommentInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateCommentCommand({ input, user }));
    return input.id;
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, RequiredJwtUserGuard)
  @Mutation(() => String)
  async updateComment(
    @Args('input') input: UpdateCommentInput,
    @ExtractedUser() user: MyUserResponse,
  ) {
    await this.commandBus.execute(new UpdateCommentCommand({ input, user }));
    return input.id;
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, RequiredJwtUserGuard)
  @Mutation(() => String)
  async deleteComment(
    @Args('input') input: DeleteCommentInput,
    @ExtractedUser() user: MyUserResponse,
  ) {
    await this.commandBus.execute(new DeleteCommentCommand({ input, user }));
    return input.id;
  }

  @Subscription(() => CommentWithAuthorResponse)
  async commentCreated(@Args() args: CommentCreatedArgs) {
    return GraphqlPubSub.asyncIterator(parseCommentCreatedTriggerName(args.postId));
  }

  @Subscription(() => UpdatedCommentResponse)
  async commentUpdated(@Args() args: CommentUpdatedArgs) {
    return GraphqlPubSub.asyncIterator(parseCommentUpdatedTriggerName(args.postId));
  }

  @Subscription(() => DeletedCommentResponse)
  async commentDeleted(@Args() args: CommentDeletedArgs) {
    return GraphqlPubSub.asyncIterator(parseCommentDeletedTriggerName(args.postId));
  }
}
