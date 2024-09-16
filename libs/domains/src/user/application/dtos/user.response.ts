import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  about: string | null;

  @Field(() => String, { nullable: true })
  avatarURL: string | null;

  @Field(() => Boolean)
  bot: boolean;

  @Field(() => Boolean, { nullable: true })
  followed?: boolean;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
