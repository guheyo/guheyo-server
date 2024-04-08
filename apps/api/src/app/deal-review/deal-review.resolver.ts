import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { CreateDealReviewCommand } from '@lib/domains/deal-review/application/commands/create-deal-review/create-deal-review.command';
import { CreateDealReviewInput } from '@lib/domains/deal-review/application/commands/create-deal-review/create-deal-review.input';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class DealReviewResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async createDealReview(
    @Args('input') input: CreateDealReviewInput,
    @ExtractedUser() user: MyUserResponse,
  ) {
    await this.commandBus.execute(new CreateDealReviewCommand({ input, user }));
    return input.id;
  }
}
