import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionResponse {
  @Field()
  sessionToken: string;

  @Field(() => GraphQLISODateTime)
  expires: Date;

  @Field()
  userId: string;

  constructor(partial: Partial<SessionResponse>) {
    Object.assign(this, partial);
  }
}
