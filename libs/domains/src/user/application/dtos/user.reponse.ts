import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserReponse {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  avatarURL: string | null;

  @Field()
  bot: boolean;

  constructor(partial: Partial<UserReponse>) {
    Object.assign(this, partial);
  }
}
