import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialUserResponse {
  @Field()
  provider: string;

  @Field()
  socialId: string;

  constructor(partial: Partial<SocialUserResponse>) {
    Object.assign(this, partial);
  }
}
