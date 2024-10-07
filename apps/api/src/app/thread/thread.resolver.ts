import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ROOT_BLOCKLIST_ROLE_NAMES } from '@lib/domains/role/domain/role.types';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import { ThreadResponse } from '@lib/domains/thread/application/dtos/thread.response';
import { FindThreadArgs } from '@lib/domains/thread/application/queries/find-thread/find-thread.args';
import { FindThreadQuery } from '@lib/domains/thread/application/queries/find-thread/find-thread.query';
import { PaginatedThreadPreviewsResponse } from '@lib/domains/thread/application/queries/find-thread-previews/paginated-thread-previews.response';
import { FindThreadPreviewsArgs } from '@lib/domains/thread/application/queries/find-thread-previews/find-thread-previews.args';
import { FindThreadPreviewsQuery } from '@lib/domains/thread/application/queries/find-thread-previews/find-thread-previews.query';
import { CreateThreadInput } from '@lib/domains/thread/application/commands/create-thread/create-thread.input';
import { CreateThreadCommand } from '@lib/domains/thread/application/commands/create-thread/create-thread.command';
import { DeleteThreadArgs } from '@lib/domains/thread/application/commands/delete-thread/delete-thread.args';
import { DeleteThreadCommand } from '@lib/domains/thread/application/commands/delete-thread/delete-thread.command';
import { UpdateThreadInput } from '@lib/domains/thread/application/commands/update-thread/update-thread.input';
import { UpdateThreadCommand } from '@lib/domains/thread/application/commands/update-thread/update-thread.command';
import { UserAgent } from '@lib/domains/auth/decorators/user-agent/user-agent.decorator';
import { IpAddress } from '@lib/domains/auth/decorators/ip/ip-address.decorator';
import { ThreadPreviewResponse } from '@lib/domains/thread/application/dtos/thread-preview.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards()
@Resolver()
export class ThreadResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => ThreadResponse, { nullable: true })
  async findThread(
    @Args() args: FindThreadArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<ThreadResponse | null> {
    const query = new FindThreadQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @UseGuards(GqlThrottlerBehindProxyGuard, OptionalJwtUserGuard)
  @Query(() => PaginatedThreadPreviewsResponse)
  async findThreadPreviews(
    @Args() args: FindThreadPreviewsArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<PaginatedThreadPreviewsResponse> {
    const query = new FindThreadPreviewsQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async createThread(
    @Args('input') input: CreateThreadInput,
    @ExtractedUser() user: MyUserResponse,
    @UserAgent() userAgent: string,
    @IpAddress() ipAddress: string,
  ): Promise<string> {
    await this.commandBus.execute(new CreateThreadCommand({ input, user, userAgent, ipAddress }));
    return input.id;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async updateThread(
    @Args('input') input: UpdateThreadInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new UpdateThreadCommand({ input, user }));
    return input.id;
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [],
  })
  @Mutation(() => String)
  async deleteThread(
    @Args() args: DeleteThreadArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<string> {
    await this.commandBus.execute(new DeleteThreadCommand({ args, user }));
    return args.id;
  }
}
