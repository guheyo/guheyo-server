import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { CreateReactionInput } from '@lib/domains/reaction/application/commands/create-reaction/create-reaction.input';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { CancelReactionInput } from '@lib/domains/reaction/application/commands/cancel-reaction/cancel-reaction.input';
import { CreateReactionCommand } from '@lib/domains/reaction/application/commands/create-reaction/create-reaction.command';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CancelReactionCommand } from '@lib/domains/reaction/application/commands/cancel-reaction/cancel-reaction.command';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class ReactionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async createReaction(
    @Args('input') input: CreateReactionInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateReactionCommand({ input, user }));
    return input.id;
  }

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async cancelReaction(
    @Args('input') input: CancelReactionInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CancelReactionCommand({ input, user }));
    return input.reactionId;
  }
}
