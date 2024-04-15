import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReportPreviewResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  type: string;

  @Field(() => ID, { nullable: true })
  reportedPostId: string | null;

  @Field(() => ID, { nullable: true })
  reportedCommentId: string | null;

  @Field(() => AuthorResponse, { nullable: true })
  reportedUser?: AuthorResponse;

  @Field(() => ID)
  groupId: string;

  @Field(() => String)
  reason: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  status: string;

  constructor(partial: Partial<ReportPreviewResponse>) {
    Object.assign(this, partial);
  }
}
