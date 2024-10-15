import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSocialAccountInput } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.input';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { UpdateSocialAccountInput } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.input';
import { DeleteSocialAccountCommand } from '@lib/domains/social-account/application/commands/delete-social-account/delete-social-account.command';
import { DeleteSocialAccountByProviderCommand } from '@lib/domains/social-account/application/commands/delete-social-account-by-provider/delete-social-account-by-provider.command';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { MutationResponse } from '@lib/shared/mutation/mutation.response';
import { PaginatedSocialAccountConflictsResponse } from '@lib/domains/social-account/application/queries/find-social-account-conflicts/paginated-social-account-conflicts.response';
import { FindSocialAccountConflictsQuery } from '@lib/domains/social-account/application/queries/find-social-account-conflicts/find-social-account-conflicts.query';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindSocialAccountConflictsArgs } from '@lib/domains/social-account/application/queries/find-social-account-conflicts/find-social-account-conflicts.args';
import { AuthenticatedSocialAccountAndRole } from '@lib/domains/auth/decorators/authenticated-social-account-and-role/authenticated-social-account-and-role.decorator';
import {
  ROOT_ADMIN_ROLE_NAMES,
  ROOT_BLOCKLIST_ROLE_NAMES,
} from '@lib/domains/role/domain/role.types';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class SocialAccountResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [...ROOT_ADMIN_ROLE_NAMES],
  })
  @UseGuards(RequiredJwtUserGuard)
  @Query(() => PaginatedSocialAccountConflictsResponse)
  async findSocialAccountConflicts(
    @Args() args: FindSocialAccountConflictsArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<PaginatedSocialAccountConflictsResponse> {
    const query = new FindSocialAccountConflictsQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [...ROOT_ADMIN_ROLE_NAMES],
  })
  @Mutation(() => MutationResponse)
  async createSocialAccount(
    @Args('input') input: CreateSocialAccountInput,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new CreateSocialAccountCommand({ input }));
    return {
      code: HttpStatus.OK,
      id: input.id,
    };
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [...ROOT_ADMIN_ROLE_NAMES],
  })
  @Mutation(() => MutationResponse)
  async updateSocialAccount(
    @Args('input') input: UpdateSocialAccountInput,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new UpdateSocialAccountCommand(input));
    return {
      code: HttpStatus.OK,
      id: input.id || '',
    };
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [...ROOT_ADMIN_ROLE_NAMES],
  })
  @Mutation(() => MutationResponse)
  async deleteSocialAccount(@Args('id', { type: () => ID }) id: string): Promise<MutationResponse> {
    await this.commandBus.execute(new DeleteSocialAccountCommand(id));
    return {
      code: HttpStatus.OK,
      id,
    };
  }

  @AuthenticatedSocialAccountAndRole({
    providers: ['kakao'],
    blocklistRoleNames: [...ROOT_BLOCKLIST_ROLE_NAMES],
    allowlistRoleNames: [...ROOT_ADMIN_ROLE_NAMES],
  })
  @Mutation(() => MutationResponse)
  async deleteSocialAccountByProvider(
    @Args('provider') provider: string,
    @Args('socialId') socialId: string,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new DeleteSocialAccountByProviderCommand(provider, socialId));
    return {
      code: HttpStatus.OK,
      id: socialId,
    };
  }
}
