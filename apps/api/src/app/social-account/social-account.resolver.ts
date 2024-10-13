import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSocialAccountInput } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.input';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { UpdateSocialAccountInput } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.input';
import { DeleteSocialAccountCommand } from '@lib/domains/social-account/application/commands/delete-social-account/delete-social-account.command';
import { DeleteSocialAccountByProviderCommand } from '@lib/domains/social-account/application/commands/delete-social-account-by-provider/delete-social-account-by-provider.command';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { MutationResponse } from '@lib/shared/mutation/mutation.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class SocialAccountResolver {
  constructor(private readonly commandBus: CommandBus) {}

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

  @Mutation(() => MutationResponse)
  async deleteSocialAccount(@Args('id', { type: () => ID }) id: string): Promise<MutationResponse> {
    await this.commandBus.execute(new DeleteSocialAccountCommand(id));
    return {
      code: HttpStatus.OK,
      id,
    };
  }

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
