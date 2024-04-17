import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { PostPreviewResponse } from '@lib/domains/post/application/dtos/post-preview.response';
import { FindPostPreviewArgs } from '@lib/domains/post/application/quries/find-post-preview/find-post-preview.args';
import { FindPostPreviewQuery } from '@lib/domains/post/application/quries/find-post-preview/find-post-preview.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class PostResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PostPreviewResponse)
  async findPostPreview(@Args() args: FindPostPreviewArgs, @ExtractedUser() user: MyUserResponse) {
    const query = new FindPostPreviewQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }
}
