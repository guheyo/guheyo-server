import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserReviewInput } from '@lib/domains/user-review/application/commands/create-user-review/create-user-review.input';
import { CreateUserReviewCommand } from '@lib/domains/user-review/application/commands/create-user-review/create-user-review.command';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class UserReviewResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @BlocklistRoleNames([...ROOT_BLOCKLIST_ROLE_NAMES])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async createUserReview(
    @Args('input') input: CreateUserReviewInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateUserReviewCommand({ input, user }));
    return input.id;
  }
}
