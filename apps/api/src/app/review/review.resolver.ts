import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import { FindReviewArgs } from '@lib/domains/review/application/queries/find-review/find-review.args';
import { FindReviewQuery } from '@lib/domains/review/application/queries/find-review/find-review.query';
import { CreateReviewInput } from '@lib/domains/review/application/commands/create-review/create-review.input';
import { CreateReviewCommand } from '@lib/domains/review/application/commands/create-review/create-review.command';
import { UserAgent } from '@lib/domains/auth/decorators/user-agent/user-agent.decorator';
import { IpAddress } from '@lib/domains/auth/decorators/ip/ip-address.decorator';
import { ReviewPreviewResponse } from '@lib/domains/review/application/dtos/review-preview.response';
import { FindReviewPreviewQuery } from '@lib/domains/review/application/queries/find-review-preview/find-review-preview.query';
import { FindReviewPreviewArgs } from '@lib/domains/review/application/queries/find-review-preview/find-review-preview.args';
import { MutationResponse } from '@lib/shared/mutation/mutation.response';
import { ReviewDetailResponse } from '@lib/domains/review/application/dtos/review-detail.response';
import { PaginatedReviewsResponse } from '@lib/domains/review/application/queries/find-reviews/paginated-reviews.response';
import { FindReviewsArgs } from '@lib/domains/review/application/queries/find-reviews/find-reviews.args';
import { FindReviewsQuery } from '@lib/domains/review/application/queries/find-reviews/find-reviews.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards()
@Resolver()
export class ReviewResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => ReviewDetailResponse, { nullable: true })
  async findReview(
    @Args() args: FindReviewArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<ReviewDetailResponse | null> {
    const query = new FindReviewQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => ReviewPreviewResponse, { nullable: true })
  async findReviewPreview(
    @Args() args: FindReviewPreviewArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<ReviewPreviewResponse | null> {
    const query = new FindReviewPreviewQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => PaginatedReviewsResponse)
  async findReviewPreviews(
    @Args() args: FindReviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<PaginatedReviewsResponse> {
    const query = new FindReviewsQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => MutationResponse)
  async createReview(
    @Args('input') input: CreateReviewInput,
    @ExtractedUser() user: MyUserResponse,
    @UserAgent() userAgent: string,
    @IpAddress() ipAddress: string,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new CreateReviewCommand({ input, user, userAgent, ipAddress }));
    return {
      code: HttpStatus.OK,
      id: input.id,
    };
  }

  // TODO: update, delete review
}
