import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCommandService } from '@lib/domains/user/application/command/user.command.service';
import { UserCreateInput } from '@lib/domains/user/application/command/user-create/user.create.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userCommandService: UserCommandService) {}

  // TODO: implement getUserById using userQueryService
  @Query(() => String)
  async getUserById(@Args('id') id: string) {
    return 'hello world';
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: UserCreateInput): Promise<void> {
    return this.userCommandService.create(input);
  }
}
