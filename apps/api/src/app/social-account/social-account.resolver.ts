import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSocialAccountInput } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.input';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { UpdateSocialAccountInput } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.input';
import { DeleteSocialAccountCommand } from '@lib/domains/social-account/application/commands/delete-social-account/delete-social-account.command';
import { DeleteSocialAccountByProviderCommand } from '@lib/domains/social-account/application/commands/delete-social-account-by-provider/delete-social-account-by-provider.command';
import { UseGuards } from '@nestjs/common';
import { GqlThrottlerGuard } from '../throttler/gql-throttler.guard';

@UseGuards(GqlThrottlerGuard)
@Resolver()
export class SocialAccountResolver {
  constructor(private readonly commandBus: CommandBus) {}

  // TODO: implement getSocialAccountsByUserId using SocialAccountQueryService
  @Query(() => String)
  async getSocialAccountsByUserId(@Args('id', { type: () => ID }) id: string) {
    return 'hello world';
  }

  @Mutation(() => String)
  async createSocialAccount(@Args('input') input: CreateSocialAccountInput): Promise<string> {
    await this.commandBus.execute(new CreateSocialAccountCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateSocialAccount(@Args('input') input: UpdateSocialAccountInput): Promise<string> {
    await this.commandBus.execute(new UpdateSocialAccountCommand(input));
    return 'ok';
  }

  @Mutation(() => String)
  async deleteSocialAccount(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteSocialAccountCommand(id));
    return id;
  }

  @Mutation(() => String)
  async deleteSocialAccountByProvider(
    @Args('provider') provider: string,
    @Args('socialId') socialId: string,
  ): Promise<string> {
    await this.commandBus.execute(new DeleteSocialAccountByProviderCommand(provider, socialId));
    return socialId;
  }
}
