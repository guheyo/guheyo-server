import { CommentResponse } from '@lib/domains/comment/application/dtos/comment.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReportResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  type: string;

  @Field(() => ID, { nullable: true })
  offerId: string | null;

  @Field(() => ID, { nullable: true })
  demandId: string | null;

  @Field(() => ID, { nullable: true })
  swapId: string | null;

  @Field()
  status: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => [CommentResponse])
  comments: CommentResponse[];

  constructor(partial: Partial<ReportResponse>) {
    Object.assign(this, partial);
  }
}
