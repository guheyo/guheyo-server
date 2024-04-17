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

  @Field(() => String)
  userId: string;

  constructor(partial: Partial<ReportCommentResponse>) {
    Object.assign(this, partial);
  }
}
