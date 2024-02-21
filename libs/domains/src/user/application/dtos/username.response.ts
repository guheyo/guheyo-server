import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsernameResponse {
  @Field()
  username: string;

  constructor(partial: Partial<UsernameResponse>) {
    Object.assign(this, partial);
  }
}
