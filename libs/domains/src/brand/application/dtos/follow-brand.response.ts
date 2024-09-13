import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FollowBrandResponse {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  brandId: string;

  @Field(() => UserResponse)
  user: UserResponse;

  constructor(partial: Partial<FollowBrandResponse>) {
    Object.assign(this, partial);
  }
}
