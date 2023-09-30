import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  avatarURL: string | null;

  @Field()
  bot: boolean;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
