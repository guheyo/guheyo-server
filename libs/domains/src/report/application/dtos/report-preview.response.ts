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

  @Field(() => ID)
  refId: string;

  @Field(() => ID)
  refVersionId: string;

  @Field(() => AuthorResponse, { nullable: true })
  reportedUser?: AuthorResponse;

  @Field(() => ID)
  groupId: string;

  @Field()
  status: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  content: string | null;

  constructor(partial: Partial<ReportPreviewResponse>) {
    Object.assign(this, partial);
  }
}
