import { CreateManyUserImageCommand } from '@lib/domains/user-image/application/commands/create-many-user-image/create-many-user-image.command';
import { CreateManyUserImageInput } from '@lib/domains/user-image/application/commands/create-many-user-image/create-many-user-image.input';
import { CreateUserImageCommand } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.command';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { DeleteUserImageCommand } from '@lib/domains/user-image/application/commands/delete-user-image/delete-user-image.command';
import { UpdateUserImageCommand } from '@lib/domains/user-image/application/commands/update-user-image/update-user-image.command';
import { UpdateUserImageInput } from '@lib/domains/user-image/application/commands/update-user-image/update-user-image.input';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { FindUserImagesOfRefArgs } from '@lib/domains/user-image/application/queries/find-user-iamges-of-ref/find-user-images-of-ref.args';
import { FindUserImagesOfRefQuery } from '@lib/domains/user-image/application/queries/find-user-iamges-of-ref/find-user-images-of-ref.query';
import { FindUserImageByIdQuery } from '@lib/domains/user-image/application/queries/find-user-image-by-id/find-user-image-by-id.query';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlThrottlerGuard } from '../throttler/gql-throttler.guard';

@UseGuards(GqlThrottlerGuard)
@Resolver()
export class UserImageResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => UserImageResponse, { nullable: true })
  async findUserImageById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UserImageResponse | null> {
    const query = new FindUserImageByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Query(() => [UserImageResponse])
  async findUserImagesOfRef(@Args() args: FindUserImagesOfRefArgs) {
    const query = new FindUserImagesOfRefQuery(args);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createUserImage(@Args('input') input: CreateUserImageInput): Promise<string> {
    await this.commandBus.execute(new CreateUserImageCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async createManyUserImage(@Args('input') input: CreateManyUserImageInput): Promise<string> {
    await this.commandBus.execute(new CreateManyUserImageCommand(input));
    return '200';
  }

  @Mutation(() => String)
  async updateUserImage(@Args('input') input: UpdateUserImageInput): Promise<string> {
    await this.commandBus.execute(new UpdateUserImageCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteUserImage(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteUserImageCommand(id));
    return id;
  }
}
