import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSocialAccountInput } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.input';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { SocialAccountDeleteInput } from '@lib/domains/social-account/application/commands/social-account-delete/social-account.delete.input';
import { SocialAccountUpdateCommand } from '@lib/domains/social-account/application/commands/social-account-update/social-account.update.command';
import { SocialAccountUpdateInput } from '@lib/domains/social-account/application/commands/social-account-update/social-account.update.input';
import { SocialAccountDeleteCommand } from '@lib/domains/social-account/application/commands/social-account-delete/social-account.delete.command';

@Resolver()
export class SocialAccountResolver {
  constructor(private readonly commandBus: CommandBus) {}

  // TODO: implement getSocialAccountsByUserId using SocialAccountQueryService
  @Query(() => String)
  async getSocialAccountsByUserId(@Args('id') id: string) {
    return 'hello world';
  }

  @Mutation(() => String)
  async createSocialAccount(@Args('input') input: CreateSocialAccountInput): Promise<String> {
    await this.commandBus.execute(new CreateSocialAccountCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateSocialAccount(@Args('input') input: SocialAccountUpdateInput): Promise<String> {
    await this.commandBus.execute(new SocialAccountUpdateCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteSocialAccount(@Args('input') input: SocialAccountDeleteInput): Promise<String> {
    await this.commandBus.execute(new SocialAccountDeleteCommand(input));
    return input.id;
  }
}
