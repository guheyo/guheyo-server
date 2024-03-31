import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserResponse {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  avatarURL: string | null;

  @Field(() => [String])
  rootRoleNames: string[];

  constructor(partial: Partial<AuthUserResponse>) {
    Object.assign(this, partial);
  }
}
