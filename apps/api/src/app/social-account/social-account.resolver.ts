import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SocialAccountCreateInput } from '@lib/domains/social-account/application/commands/social-account-create/social-account.create.input';
import { SocialAccountDeleteInput } from '@lib/domains/social-account/application/commands/social-account-delete/social-account.delete.input';
import { SocialAccountUpdateInput } from '@lib/domains/social-account/application/commands/social-account-update/social-account.update.input';
import { SocialAccountCommandService } from '@lib/domains/social-account/application/commands/social-account.command.service';

@Resolver()
export class SocialAccountResolver {
  constructor(private readonly socialAccountCommandService: SocialAccountCommandService) {}

  // TODO: implement getSocialAccountsByUserId using SocialAccountQueryService
  @Query(() => String)
  async getSocialAccountsByUserId(@Args('id') id: string) {
    return 'hello world';
  }

  @Mutation(() => String)
  async createSocialAccount(@Args('input') input: SocialAccountCreateInput): Promise<String> {
    await this.socialAccountCommandService.create(input);
    return input.id;
  }

  @Mutation(() => String)
  async updateSocialAccount(@Args('input') input: SocialAccountUpdateInput): Promise<String> {
    await this.socialAccountCommandService.update(input);
    return input.id;
  }

  @Mutation(() => String)
  async deleteSocialAccount(@Args('input') input: SocialAccountDeleteInput): Promise<String> {
    await this.socialAccountCommandService.delete(input);
    return input.id;
  }
}
