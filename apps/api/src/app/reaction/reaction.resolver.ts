import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { CreateReactionInput } from '@lib/domains/reaction/application/commands/create-reaction/create-reaction.input';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { CancelReactionInput } from '@lib/domains/reaction/application/commands/cancel-reaction/cancel-reaction.input';
import { CreateReactionCommand } from '@lib/domains/reaction/application/commands/create-reaction/create-reaction.command';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CancelReactionCommand } from '@lib/domains/reaction/application/commands/cancel-reaction/cancel-reaction.command';
import { ReactionResponse } from '@lib/domains/reaction/application/dtos/reaction.response';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { CanceledReactionResponse } from '@lib/domains/reaction/application/dtos/canceled-reaction.response';
import { FindReactionsArgs } from '@lib/domains/reaction/application/queries/find-reactions/find-reactions.args';
import { FindReactionsQuery } from '@lib/domains/reaction/application/queries/find-reactions/find-reactions.query';
import { ReactionCreatedArgs } from '@lib/domains/reaction/application/subscriptions/reaction-created/reaction-created.args';
import { parseReactionCreatedTriggerName } from '@lib/domains/reaction/application/subscriptions/reaction-created/parse-reaction-created-trigger-name';
import { ReactionCanceledArgs } from '@lib/domains/reaction/application/subscriptions/reaction-canceled/reaction-canceled.args';
import { parseReactionCanceledTriggerName } from '@lib/domains/reaction/application/subscriptions/reaction-canceled/parse-reaction-canceled-trigger-name';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import { UserAgent } from '@lib/domains/auth/decorators/user-agent/user-agent.decorator';
import { IpAddress } from '@lib/domains/auth/decorators/ip/ip-address.decorator';
import { MutationResponse } from '@lib/shared/mutation/mutation.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@Resolver()
export class ReactionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [ReactionResponse])
  @UseGuards(GqlThrottlerBehindProxyGuard)
  async findReactions(@Args() args: FindReactionsArgs) {
    return this.queryBus.execute(new FindReactionsQuery({ args }));
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => MutationResponse)
  async createReaction(
    @Args('input') input: CreateReactionInput,
    @ExtractedUser() user: MyUserResponse,
    @UserAgent() userAgent: string,
    @IpAddress() ipAddress: string,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new CreateReactionCommand({ input, user, userAgent, ipAddress }));
    return {
      code: HttpStatus.OK,
      id: input.id,
    };
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => MutationResponse)
  async cancelReaction(
    @Args('input') input: CancelReactionInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new CancelReactionCommand({ input, user }));
    return {
      code: HttpStatus.OK,
      id: input.emojiId,
    };
  }

  @Subscription(() => ReactionResponse, {
    filter: (payload, variables) =>
      payload.reactionCreated.postId === variables.postId && variables.type === 'post'
        ? !payload.reactionCreated.commentId
        : !!payload.reactionCreated.commentId,
  })
  async reactionCreated(@Args() args: ReactionCreatedArgs) {
    return GraphqlPubSub.asyncIterator(
      parseReactionCreatedTriggerName({ type: args.type, postId: args.postId }),
    );
  }

  @Subscription(() => CanceledReactionResponse, {
    filter: (payload, variables) =>
      payload.reactionCanceled.postId === variables.postId && variables.type === 'post'
        ? !payload.reactionCanceled.commentId
        : !!payload.reactionCanceled.commentId,
  })
  async reactionCanceled(@Args() args: ReactionCanceledArgs) {
    return GraphqlPubSub.asyncIterator(
      parseReactionCanceledTriggerName({ type: args.type, postId: args.postId }),
    );
  }
}
