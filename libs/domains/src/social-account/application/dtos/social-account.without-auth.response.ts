import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SocialUserResponse } from './social-user.response';

@ObjectType()
export class SocialAccountWithoutAuthResponse extends SocialUserResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  userId: string;

  constructor(partial: Partial<SocialAccountWithoutAuthResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
