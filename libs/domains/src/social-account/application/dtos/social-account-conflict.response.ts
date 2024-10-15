import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialAccountConflictResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String, { nullable: true })
  conflictReason: string | null;

  @Field()
  provider: string;

  @Field()
  socialId: string;

  @Field(() => AuthorResponse)
  newUser: AuthorResponse;

  @Field(() => AuthorResponse)
  existingUser: AuthorResponse;

  @Field()
  status: string;

  @Field(() => String, { nullable: true })
  userAgent: string | null;

  @Field(() => String, { nullable: true })
  ipAddress: string | null;

  constructor(partial: Partial<SocialAccountConflictResponse>) {
    Object.assign(this, partial);
  }
}
