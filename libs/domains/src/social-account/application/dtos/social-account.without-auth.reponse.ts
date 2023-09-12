import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialAccountWithoutAuthResponse {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field()
  provider: string;

  @Field()
  socialId: string;

  @Field()
  userId: string;

  constructor(partial: Partial<SocialAccountWithoutAuthResponse>) {
    Object.assign(this, partial);
  }
}
