import { AllowlistRoleNames } from '@lib/domains/auth/decorators/allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '@lib/domains/auth/decorators/blocklist-role-names/blocklist-role-names.decorator';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { RootRoleGuard } from '@lib/domains/auth/guards/role/root-role.guard';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserReviewInput } from '@lib/domains/user-review/application/commands/create-user-review/create-user-review.input';
import { CreateUserReviewCommand } from '@lib/domains/user-review/application/commands/create-user-review/create-user-review.command';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { FindUserReviewPreviewsArgs } from '@lib/domains/user-review/application/queries/find-user-review-previews/find-user-review-previews.args';
import { FindUserReviewPreviewsQuery } from '@lib/domains/user-review/application/queries/find-user-review-previews/find-user-review-previews.query';
import { PaginatedUserReviewPreviewsResponse } from '@lib/domains/user-review/application/queries/find-user-review-previews/paginated-user-review-previews.response';
import { UserReviewResponse } from '@lib/domains/user-review/application/dtos/user-review.response';
import { FindUserReviewArgs } from '@lib/domains/user-review/application/queries/find-user-review/find-user-review.args';
import { FindUserReviewQuery } from '@lib/domains/user-review/application/queries/find-user-review/find-user-review.query';
import { REPORTED_USER_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { DeleteUserReviewArgs } from '@lib/domains/user-review/application/commands/delete-user-review/delete-user-review.args';
import { DeleteUserReviewCommand } from '@lib/domains/user-review/application/commands/delete-user-review/delete-user-review.command';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class UserReviewResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedUserReviewPreviewsResponse)
  async findUserReviewPreviews(
    @Args() args: FindUserReviewPreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ) {
    const query = new FindUserReviewPreviewsQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => UserReviewResponse, { nullable: true })
  async findUserReview(
    @Args() args: FindUserReviewArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<UserReviewResponse | null> {
    const query = new FindUserReviewQuery({
      args,
      userId: user.id,
    });
    return this.queryBus.execute(query);
  }

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

  @BlocklistRoleNames([REPORTED_USER_ROLE_NAME])
  @AllowlistRoleNames([])
  @UseGuards(RequiredJwtUserGuard, RootRoleGuard)
  @Mutation(() => String)
  async deleteUserReview(
    @Args() args: DeleteUserReviewArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new DeleteUserReviewCommand({ args, user }));
    return args.id;
  }
}
