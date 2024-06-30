import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import { TimeGuard } from '@lib/shared/time/time.guard';
import { ArticleResponse } from '@lib/domains/article/application/dtos/article.response';
import { FindArticleArgs } from '@lib/domains/article/application/queries/find-article/find-article.args';
import { FindArticleQuery } from '@lib/domains/article/application/queries/find-article/find-article.query';
import { PaginatedArticlePreviewsResponse } from '@lib/domains/article/application/queries/find-article-previews/paginated-article-previews.response';
import { FindArticlePreviewsArgs } from '@lib/domains/article/application/queries/find-article-previews/find-article-previews.args';
import { FindArticlePreviewsQuery } from '@lib/domains/article/application/queries/find-article-previews/find-article-previews.query';
import { CreateArticleInput } from '@lib/domains/article/application/commands/create-article/create-article.input';
import { CreateArticleCommand } from '@lib/domains/article/application/commands/create-article/create-article.command';
import { DeleteArticleArgs } from '@lib/domains/article/application/commands/delete-article/delete-article.args';
import { DeleteArticleCommand } from '@lib/domains/article/application/commands/delete-article/delete-article.command';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards()
@Resolver()
export class ArticleResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => ArticleResponse, { nullable: true })
  async findArticle(
    @Args() args: FindArticleArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<ArticleResponse | null> {
    const query = new FindArticleQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => PaginatedArticlePreviewsResponse)
  async findArticlePreviews(
    @Args() args: FindArticlePreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<PaginatedArticlePreviewsResponse> {
    const query = new FindArticlePreviewsQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @UseGuards(new TimeGuard(2, 6))
  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async createArticle(
    @Args('input') input: CreateArticleInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new CreateArticleCommand({ input, user }));
    return input.id;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async deleteArticle(
    @Args() args: DeleteArticleArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new DeleteArticleCommand({ args, user }));
    return args.id;
  }
}
