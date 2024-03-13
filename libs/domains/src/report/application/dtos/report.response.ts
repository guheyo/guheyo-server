import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
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
  type: Date;

  @Field(() => ID, { nullable: true })
  offerId: string | null;

  @Field(() => ID, { nullable: true })
  demandId: string | null;

  @Field(() => ID, { nullable: true })
  swapId: string | null;

  @Field(() => AuthorResponse)
  author: AuthorResponse;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field()
  status: string;

  constructor(partial: Partial<ReportResponse>) {
    Object.assign(this, partial);
  }
}
