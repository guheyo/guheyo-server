import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReportCommentResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => ID)
  reportId: string;

  @Field(() => String)
  content: string;

  @Field(() => AuthorResponse)
  user: AuthorResponse;

  constructor(partial: Partial<ReportCommentResponse>) {
    Object.assign(this, partial);
  }
}
